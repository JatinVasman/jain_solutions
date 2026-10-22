import {
  Injectable,
  Logger,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { EmailService } from './email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  AccountStatus,
  RoleType,
  ApprovalStatus,
  AuthUser,
  AuthResponse,
  AuthTokenPayload,
  UserSession,
} from '@rental-platform/types';

// In-Memory fallback store for environments without a running PostgreSQL instance
interface InMemoryUser {
  id: string;
  email: string;
  phone?: string;
  name: string;
  passwordHash: string;
  status: AccountStatus;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  roles: Array<{
    id: string;
    roleId: string;
    roleName: RoleType;
    approvalStatus: ApprovalStatus;
    assignedAt: Date;
  }>;
}

interface InMemoryToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

interface InMemorySession {
  id: string;
  userId: string;
  tokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // In-Memory cache/fallback for resilience
  private memoryUsers: Map<string, InMemoryUser> = new Map();
  private memorySessions: Map<string, InMemorySession> = new Map();
  private memoryEmailTokens: Map<string, InMemoryToken> = new Map();
  private memoryPasswordTokens: Map<string, InMemoryToken> = new Map();

  // Failed login attempts for rate limiting: ip/email -> { count, lockedUntil }
  private failedAttempts: Map<string, { count: number; lockedUntil: number }> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.seedDefaultRoles();
  }

  private hashToken(raw: string): string {
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  private generateRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private checkRateLimit(key: string): void {
    const record = this.failedAttempts.get(key);
    if (!record) return;

    if (record.lockedUntil > Date.now()) {
      const waitSeconds = Math.ceil((record.lockedUntil - Date.now()) / 1000);
      throw new ForbiddenException(
        `Too many failed attempts. Please wait ${waitSeconds} seconds before trying again.`,
      );
    }
  }

  private recordFailedAttempt(key: string): void {
    const record = this.failedAttempts.get(key) || { count: 0, lockedUntil: 0 };
    record.count += 1;
    if (record.count >= 5) {
      // Lock out for 5 minutes after 5 consecutive failures
      record.lockedUntil = Date.now() + 5 * 60 * 1000;
      this.logger.warn(`Rate limit triggered for key ${key}. Temporary lock applied.`);
    }
    this.failedAttempts.set(key, record);
  }

  private clearFailedAttempts(key: string): void {
    this.failedAttempts.delete(key);
  }

  /**
   * Seed baseline roles in DB if connected
   */
  private async seedDefaultRoles() {
    try {
      const isHealthy = await this.prisma.isHealthy();
      if (!isHealthy) return;

      const roles = Object.values(RoleType);
      for (const roleName of roles) {
        await this.prisma.role.upsert({
          where: { name: roleName as any },
          update: {},
          create: {
            name: roleName as any,
            description: `Default system role for ${roleName}`,
          },
        });
      }
      this.logger.log('Default RBAC roles verified in PostgreSQL.');
    } catch {
      // Prisma offline or schema not migrated yet; graceful fallback
    }
  }

  /**
   * Register a new user
   */
  async register(
    dto: RegisterDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ message: string; requiresVerification: boolean; email: string }> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const normalizedEmail = dto.email.trim().toLowerCase();

    // Check if email already exists
    const existing = await this.findUserByEmail(normalizedEmail);
    if (existing) {
      throw new ConflictException('An account with this email address already exists');
    }

    // Hash password with bcrypt (12 rounds)
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Initial role status:
    // CUSTOMER role is automatically APPROVED upon email verification.
    // PRODUCT_OWNER, PARTNER, FREELANCER, JOB_SEEKER require explicit approval, so they start PENDING_REVIEW.
    const initialApproval =
      dto.role === RoleType.CUSTOMER ? ApprovalStatus.APPROVED : ApprovalStatus.PENDING_REVIEW;

    const rawVerificationToken = this.generateRandomToken();
    const tokenHash = this.hashToken(rawVerificationToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const isHealthy = await this.prisma.isHealthy();

    if (isHealthy) {
      try {
        // Find or create role
        const role = await this.prisma.role.upsert({
          where: { name: dto.role as any },
          update: {},
          create: {
            name: dto.role as any,
            description: `System role for ${dto.role}`,
          },
        });

        // Create user with role assignment and verification token
        const createdUser = await this.prisma.user.create({
          data: {
            email: normalizedEmail,
            name: dto.name.trim(),
            phone: dto.phone?.trim() || null,
            passwordHash,
            status: AccountStatus.PENDING_VERIFICATION,
            roles: {
              create: {
                roleId: role.id,
                approvalStatus: initialApproval,
              },
            },
            emailTokens: {
              create: {
                tokenHash,
                expiresAt,
              },
            },
            auditLogs: {
              create: {
                event: 'REGISTER',
                ipAddress,
                userAgent,
                metadata: { role: dto.role, initialApproval },
              },
            },
          },
        });

        await this.emailService.sendVerificationEmail(
          createdUser.email,
          createdUser.name,
          rawVerificationToken,
        );

        return {
          message:
            'Registration successful! Please check your email to verify your account before accessing protected services.',
          requiresVerification: true,
          email: createdUser.email,
        };
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL registration fallback: ${(err as Error).message}`);
      }
    }

    // In-Memory store fallback
    const userId = crypto.randomUUID();
    const inMemoryUser: InMemoryUser = {
      id: userId,
      email: normalizedEmail,
      phone: dto.phone?.trim(),
      name: dto.name.trim(),
      passwordHash,
      status: AccountStatus.PENDING_VERIFICATION,
      emailVerifiedAt: null,
      phoneVerifiedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [
        {
          id: crypto.randomUUID(),
          roleId: crypto.randomUUID(),
          roleName: dto.role,
          approvalStatus: initialApproval,
          assignedAt: new Date(),
        },
      ],
    };
    this.memoryUsers.set(userId, inMemoryUser);

    this.memoryEmailTokens.set(tokenHash, {
      id: crypto.randomUUID(),
      userId,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    });

    await this.emailService.sendVerificationEmail(
      inMemoryUser.email,
      inMemoryUser.name,
      rawVerificationToken,
    );

    return {
      message:
        'Registration successful! Please check your email to verify your account before accessing protected services.',
      requiresVerification: true,
      email: inMemoryUser.email,
    };
  }

  /**
   * Login user with credentials
   */
  async login(
    dto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ response: AuthResponse; rawSessionToken: string }> {
    const rateLimitKey = `${ipAddress || 'unknown'}:${dto.email.toLowerCase()}`;
    this.checkRateLimit(rateLimitKey);

    const user = await this.findUserWithRolesByEmail(dto.email.toLowerCase());
    if (!user || !user.passwordHash) {
      this.recordFailedAttempt(rateLimitKey);
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      this.recordFailedAttempt(rateLimitKey);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Account status checks
    if (user.status === AccountStatus.SUSPENDED) {
      throw new ForbiddenException(
        'Your account has been suspended. Please contact customer support.',
      );
    }
    if (user.status === AccountStatus.DEACTIVATED) {
      throw new ForbiddenException('This account has been deactivated.');
    }

    // Check verification status
    if (user.status === AccountStatus.PENDING_VERIFICATION || !user.emailVerifiedAt) {
      return {
        response: {
          user: this.sanitizeUser(user),
          accessToken: '',
          requiresVerification: true,
          message: 'Please verify your email address to complete your account activation.',
        },
        rawSessionToken: '',
      };
    }

    // Credentials valid, clear rate-limit failure counter
    this.clearFailedAttempts(rateLimitKey);

    // Create session & JWT token
    const rawSessionToken = this.generateRandomToken();
    const tokenHash = this.hashToken(rawSessionToken);
    const sessionDurationDays = dto.rememberMe ? 30 : 7;
    const expiresAt = new Date(Date.now() + sessionDurationDays * 24 * 60 * 60 * 1000);

    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        await this.prisma.session.create({
          data: {
            userId: user.id,
            tokenHash,
            userAgent,
            ipAddress,
            expiresAt,
          },
        });

        await this.prisma.authAuditLog.create({
          data: {
            userId: user.id,
            event: 'LOGIN_SUCCESS',
            ipAddress,
            userAgent,
          },
        });
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL session logging fallback: ${(err as Error).message}`);
      }
    }

    // Store in-memory session
    this.memorySessions.set(tokenHash, {
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      userAgent,
      ipAddress,
      expiresAt,
      revokedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const jwtSecret = this.configService.get<string>(
      'jwt.secret',
      'dev-super-secure-rental-jwt-secret-phase3-key-2026',
    );
    const jwtExpires = this.configService.get<string>('jwt.expiresIn', '15m');

    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
      status: user.status as AccountStatus,
      roles: user.roles.map((r) => r.name),
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: jwtExpires as any,
    });

    return {
      response: {
        user: this.sanitizeUser(user),
        accessToken,
        requiresVerification: false,
        message: 'Login successful',
      },
      rawSessionToken,
    };
  }

  /**
   * Verify email via token
   */
  async verifyEmail(
    rawToken: string,
    ipAddress?: string,
  ): Promise<{ message: string; verified: boolean; email?: string }> {
    const tokenHash = this.hashToken(rawToken);
    const isHealthy = await this.prisma.isHealthy();

    if (isHealthy) {
      try {
        const tokenRecord = await this.prisma.emailVerificationToken.findUnique({
          where: { tokenHash },
          include: { user: { include: { roles: { include: { role: true } } } } },
        });

        if (!tokenRecord) {
          throw new BadRequestException('Invalid or expired verification token');
        }

        if (tokenRecord.usedAt) {
          return {
            message: 'This email address has already been verified.',
            verified: true,
            email: tokenRecord.user.email,
          };
        }

        if (tokenRecord.expiresAt < new Date()) {
          throw new BadRequestException('This verification link has expired. Please request a new one.');
        }

        // Mark token used
        await this.prisma.emailVerificationToken.update({
          where: { id: tokenRecord.id },
          data: { usedAt: new Date() },
        });

        // Activate user
        await this.prisma.user.update({
          where: { id: tokenRecord.userId },
          data: {
            status: AccountStatus.ACTIVE,
            emailVerifiedAt: new Date(),
          },
        });

        // For CUSTOMER roles, approve role automatically
        for (const userRole of tokenRecord.user.roles) {
          if (userRole.role.name === (RoleType.CUSTOMER as any)) {
            await this.prisma.userRole.update({
              where: { id: userRole.id },
              data: { approvalStatus: ApprovalStatus.APPROVED, approvedAt: new Date() },
            });
          }
        }

        await this.prisma.authAuditLog.create({
          data: {
            userId: tokenRecord.userId,
            event: 'EMAIL_VERIFIED',
            ipAddress,
          },
        });

        return {
          message: 'Your email address has been successfully verified! You may now log in.',
          verified: true,
          email: tokenRecord.user.email,
        };
      } catch (err: unknown) {
        if (err instanceof BadRequestException) throw err;
        this.logger.warn(`PostgreSQL verification fallback: ${(err as Error).message}`);
      }
    }

    // In-memory verification fallback
    const memToken = this.memoryEmailTokens.get(tokenHash);
    if (!memToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }
    if (memToken.usedAt) {
      return {
        message: 'This email address has already been verified.',
        verified: true,
      };
    }
    if (memToken.expiresAt < new Date()) {
      throw new BadRequestException('This verification link has expired. Please request a new one.');
    }

    memToken.usedAt = new Date();
    const user = this.memoryUsers.get(memToken.userId);
    if (user) {
      user.status = AccountStatus.ACTIVE;
      user.emailVerifiedAt = new Date();
      for (const r of user.roles) {
        if (r.roleName === RoleType.CUSTOMER) {
          r.approvalStatus = ApprovalStatus.APPROVED;
        }
      }
    }

    return {
      message: 'Your email address has been successfully verified! You may now log in.',
      verified: true,
      email: user?.email,
    };
  }

  /**
   * Resend verification email with rate limiting
   */
  async resendVerification(email: string, ipAddress?: string): Promise<{ message: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.findUserByEmail(normalizedEmail);

    // Generic safe response to prevent email enumeration
    const genericResponse = {
      message: 'If your email is registered and unverified, a new verification link has been sent.',
    };

    if (!user) {
      return genericResponse;
    }

    if (user.emailVerifiedAt && user.status !== AccountStatus.PENDING_VERIFICATION) {
      return { message: 'Your email is already verified. You can log in directly.' };
    }

    const rawToken = this.generateRandomToken();
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        await this.prisma.emailVerificationToken.create({
          data: {
            userId: user.id,
            tokenHash,
            expiresAt,
          },
        });
        await this.prisma.authAuditLog.create({
          data: {
            userId: user.id,
            event: 'RESEND_VERIFICATION',
            ipAddress,
          },
        });
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL resend verification fallback: ${(err as Error).message}`);
      }
    }

    this.memoryEmailTokens.set(tokenHash, {
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    });

    await this.emailService.sendVerificationEmail(user.email, user.name, rawToken);

    return genericResponse;
  }

  /**
   * Initiate forgot password flow
   */
  async forgotPassword(email: string, ipAddress?: string): Promise<{ message: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.findUserByEmail(normalizedEmail);

    const genericResponse = {
      message: 'If an account exists with that email, a password reset link has been dispatched.',
    };

    if (!user) {
      return genericResponse;
    }

    const rawToken = this.generateRandomToken();
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        await this.prisma.passwordResetToken.create({
          data: {
            userId: user.id,
            tokenHash,
            expiresAt,
          },
        });
        await this.prisma.authAuditLog.create({
          data: {
            userId: user.id,
            event: 'PASSWORD_RESET_REQUESTED',
            ipAddress,
          },
        });
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL password reset request fallback: ${(err as Error).message}`);
      }
    }

    this.memoryPasswordTokens.set(tokenHash, {
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    });

    await this.emailService.sendPasswordResetEmail(user.email, user.name, rawToken);

    return genericResponse;
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    rawToken: string,
    newPass: string,
    confirmPass: string,
    ipAddress?: string,
  ): Promise<{ message: string }> {
    if (newPass !== confirmPass) {
      throw new BadRequestException('Passwords do not match');
    }

    const tokenHash = this.hashToken(rawToken);
    const isHealthy = await this.prisma.isHealthy();

    if (isHealthy) {
      try {
        const tokenRecord = await this.prisma.passwordResetToken.findUnique({
          where: { tokenHash },
          include: { user: true },
        });

        if (!tokenRecord) {
          throw new BadRequestException('Invalid or expired password reset link');
        }

        if (tokenRecord.usedAt) {
          throw new BadRequestException('This password reset link has already been used.');
        }

        if (tokenRecord.expiresAt < new Date()) {
          throw new BadRequestException('This password reset link has expired. Please request a new one.');
        }

        const newHash = await bcrypt.hash(newPass, 12);

        // Update password and mark token used
        await this.prisma.passwordResetToken.update({
          where: { id: tokenRecord.id },
          data: { usedAt: new Date() },
        });

        await this.prisma.user.update({
          where: { id: tokenRecord.userId },
          data: { passwordHash: newHash },
        });

        // Revoke all existing sessions for security
        await this.prisma.session.updateMany({
          where: { userId: tokenRecord.userId, revokedAt: null },
          data: { revokedAt: new Date() },
        });

        await this.prisma.authAuditLog.create({
          data: {
            userId: tokenRecord.userId,
            event: 'PASSWORD_RESET_SUCCESS',
            ipAddress,
          },
        });

        return { message: 'Your password has been successfully reset. Please log in with your new credentials.' };
      } catch (err: unknown) {
        if (err instanceof BadRequestException) throw err;
        this.logger.warn(`PostgreSQL reset password fallback: ${(err as Error).message}`);
      }
    }

    // In-memory fallback
    const memToken = this.memoryPasswordTokens.get(tokenHash);
    if (!memToken || memToken.usedAt || memToken.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired password reset link');
    }

    memToken.usedAt = new Date();
    const user = this.memoryUsers.get(memToken.userId);
    if (!user) {
      throw new NotFoundException('Account not found');
    }

    user.passwordHash = await bcrypt.hash(newPass, 12);

    // Invalidate sessions
    for (const session of this.memorySessions.values()) {
      if (session.userId === user.id) {
        session.revokedAt = new Date();
      }
    }

    return { message: 'Your password has been successfully reset. Please log in with your new credentials.' };
  }

  /**
   * Change password for logged-in user
   */
  async changePassword(
    userId: string,
    currentPass: string,
    newPass: string,
    confirmPass: string,
  ): Promise<{ message: string }> {
    if (newPass !== confirmPass) {
      throw new BadRequestException('New password and confirmation do not match');
    }

    const user = await this.getUserWithPasswordById(userId);
    if (!user || !user.passwordHash) {
      throw new NotFoundException('User not found');
    }

    const validCurrent = await bcrypt.compare(currentPass, user.passwordHash);
    if (!validCurrent) {
      throw new BadRequestException('Current password does not match');
    }

    const newHash = await bcrypt.hash(newPass, 12);
    const isHealthy = await this.prisma.isHealthy();

    if (isHealthy) {
      try {
        await this.prisma.user.update({
          where: { id: userId },
          data: { passwordHash: newHash },
        });

        await this.prisma.authAuditLog.create({
          data: {
            userId,
            event: 'PASSWORD_CHANGED',
          },
        });

        return { message: 'Password updated successfully' };
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL change password fallback: ${(err as Error).message}`);
      }
    }

    // In-memory fallback
    const memUser = this.memoryUsers.get(userId);
    if (memUser) {
      memUser.passwordHash = newHash;
    }

    return { message: 'Password updated successfully' };
  }

  /**
   * Logout user by invalidating session token
   */
  async logout(rawSessionToken?: string): Promise<void> {
    if (!rawSessionToken) return;
    const tokenHash = this.hashToken(rawSessionToken);

    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        await this.prisma.session.updateMany({
          where: { tokenHash, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      } catch {
        // Ignore fallback
      }
    }

    const memSession = this.memorySessions.get(tokenHash);
    if (memSession) {
      memSession.revokedAt = new Date();
    }
  }

  /**
   * Get active sessions for a user
   */
  async getUserSessions(userId: string): Promise<UserSession[]> {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        const sessions = await this.prisma.session.findMany({
          where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
        });

        return sessions.map((s) => ({
          id: s.id,
          userId: s.userId,
          userAgent: s.userAgent || undefined,
          ipAddress: s.ipAddress || undefined,
          createdAt: s.createdAt,
          expiresAt: s.expiresAt,
          isCurrent: false,
        }));
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL get sessions fallback: ${(err as Error).message}`);
      }
    }

    // In-memory fallback
    const result: UserSession[] = [];
    for (const s of this.memorySessions.values()) {
      if (s.userId === userId && !s.revokedAt && s.expiresAt > new Date()) {
        result.push({
          id: s.id,
          userId: s.userId,
          userAgent: s.userAgent,
          ipAddress: s.ipAddress,
          createdAt: s.createdAt,
          expiresAt: s.expiresAt,
          isCurrent: false,
        });
      }
    }
    return result;
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        await this.prisma.session.updateMany({
          where: { id: sessionId, userId },
          data: { revokedAt: new Date() },
        });
        return;
      } catch {
        // Fallback
      }
    }

    for (const s of this.memorySessions.values()) {
      if (s.id === sessionId && s.userId === userId) {
        s.revokedAt = new Date();
      }
    }
  }

  /**
   * Fetch authenticated user by ID
   */
  async getUserById(userId: string): Promise<AuthUser | null> {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          include: {
            roles: {
              include: { role: true },
            },
          },
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone || undefined,
            status: user.status as AccountStatus,
            emailVerified: !!user.emailVerifiedAt,
            roles: user.roles.map((r) => ({
              id: r.id,
              name: r.role.name as RoleType,
              approvalStatus: r.approvalStatus as ApprovalStatus,
              assignedAt: r.assignedAt,
            })),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        }
      } catch (err: unknown) {
        this.logger.warn(`PostgreSQL getUserById fallback: ${(err as Error).message}`);
      }
    }

    const memUser = this.memoryUsers.get(userId);
    if (!memUser) return null;

    return {
      id: memUser.id,
      email: memUser.email,
      name: memUser.name,
      phone: memUser.phone,
      status: memUser.status,
      emailVerified: !!memUser.emailVerifiedAt,
      roles: memUser.roles.map((r) => ({
        id: r.id,
        name: r.roleName,
        approvalStatus: r.approvalStatus,
        assignedAt: r.assignedAt,
      })),
      createdAt: memUser.createdAt,
      updatedAt: memUser.updatedAt,
    };
  }

  // --- Internal Query Helpers ---

  private async findUserByEmail(email: string) {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        return await this.prisma.user.findUnique({ where: { email } });
      } catch {
        // Fallback
      }
    }

    for (const u of this.memoryUsers.values()) {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return u;
      }
    }
    return null;
  }

  private async findUserWithRolesByEmail(email: string) {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              include: { role: true },
            },
          },
        });
        if (user) {
          return {
            ...user,
            roles: user.roles.map((r) => ({
              id: r.id,
              name: r.role.name as RoleType,
              approvalStatus: r.approvalStatus as ApprovalStatus,
              assignedAt: r.assignedAt,
            })),
          };
        }
      } catch {
        // Fallback
      }
    }

    for (const u of this.memoryUsers.values()) {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return {
          ...u,
          roles: u.roles.map((r) => ({
            id: r.id,
            name: r.roleName,
            approvalStatus: r.approvalStatus,
            assignedAt: r.assignedAt,
          })),
        };
      }
    }
    return null;
  }

  private async getUserWithPasswordById(userId: string) {
    const isHealthy = await this.prisma.isHealthy();
    if (isHealthy) {
      try {
        return await this.prisma.user.findUnique({ where: { id: userId } });
      } catch {
        // Fallback
      }
    }
    return this.memoryUsers.get(userId) || null;
  }

  private sanitizeUser(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone || undefined,
      status: user.status as AccountStatus,
      emailVerified: !!user.emailVerifiedAt,
      roles: user.roles.map((r: any) => ({
        id: r.id,
        name: r.name as RoleType,
        approvalStatus: r.approvalStatus as ApprovalStatus,
        assignedAt: r.assignedAt,
      })),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

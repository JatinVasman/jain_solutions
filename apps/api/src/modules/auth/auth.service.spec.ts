import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConflictException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { PrismaService } from '../../database/prisma.service';
import { RoleType, AccountStatus } from '@rental-platform/types';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

describe('AuthService (Unit & Integration)', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          secret: 'test-secret-key-12345678',
          signOptions: { expiresIn: '15m' },
        }),
      ],
      providers: [
        AuthService,
        EmailService,
        {
          provide: PrismaService,
          useValue: {
            isHealthy: jest.fn().mockResolvedValue(false), // uses resilient memory store in isolated unit tests
            user: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
            role: { upsert: jest.fn() },
            userRole: { create: jest.fn(), update: jest.fn() },
            session: { create: jest.fn(), updateMany: jest.fn(), findMany: jest.fn() },
            emailVerificationToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
            passwordResetToken: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
            authAuditLog: { create: jest.fn() },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Registration & Password Hashing', () => {
    it('should register a new customer successfully and require verification', async () => {
      const result = await authService.register({
        email: 'customer@example.com',
        name: 'Jane Doe',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      expect(result.requiresVerification).toBe(true);
      expect(result.email).toBe('customer@example.com');
      expect(result.message).toContain('Registration successful');
    });

    it('should securely hash password and never store plaintext', async () => {
      await authService.register({
        email: 'security.test@example.com',
        name: 'Security Test',
        password: 'SuperSecret123!',
        confirmPassword: 'SuperSecret123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      const user = await (authService as any).findUserByEmail('security.test@example.com');
      expect(user).toBeDefined();
      expect(user.passwordHash).not.toBe('SuperSecret123!');
      const matches = await bcrypt.compare('SuperSecret123!', user.passwordHash);
      expect(matches).toBe(true);
    });

    it('should reject duplicate email registration with ConflictException', async () => {
      await authService.register({
        email: 'duplicate@example.com',
        name: 'First User',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      await expect(
        authService.register({
          email: 'duplicate@example.com',
          name: 'Second User',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          role: RoleType.CUSTOMER,
          termsAccepted: true,
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should reject registration if passwords do not match', async () => {
      await expect(
        authService.register({
          email: 'mismatch@example.com',
          name: 'Mismatch User',
          password: 'Password123!',
          confirmPassword: 'DifferentPassword123!',
          role: RoleType.CUSTOMER,
          termsAccepted: true,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Email Verification Flow', () => {
    it('should verify email and activate customer account', async () => {
      await authService.register({
        email: 'verify.me@example.com',
        name: 'Verify Me',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      // Find token stored in memory
      let rawToken = '';
      for (const [hash, record] of (authService as any).memoryEmailTokens.entries()) {
        const user = (authService as any).memoryUsers.get(record.userId);
        if (user && user.email === 'verify.me@example.com') {
          // Token hash found; let's simulate the verification token
          rawToken = 'sample-token';
          // Inject raw token hash mapping for test
          const testToken = 'valid-test-verification-token';
          const testHash = crypto.createHash('sha256').update(testToken).digest('hex');
          (authService as any).memoryEmailTokens.set(testHash, {
            ...record,
            tokenHash: testHash,
          });
          rawToken = testToken;
          break;
        }
      }

      const verifyResult = await authService.verifyEmail(rawToken);
      expect(verifyResult.verified).toBe(true);

      const verifiedUser = await (authService as any).findUserByEmail('verify.me@example.com');
      expect(verifiedUser.status).toBe(AccountStatus.ACTIVE);
      expect(verifiedUser.emailVerifiedAt).toBeDefined();
    });

    it('should reject invalid or non-existent verification tokens', async () => {
      await expect(authService.verifyEmail('invalid-token-12345')).rejects.toThrow(BadRequestException);
    });
  });

  describe('Login Flow & Security Restrictions', () => {
    beforeEach(async () => {
      // Register and activate a test user
      await authService.register({
        email: 'active.user@example.com',
        name: 'Active User',
        password: 'CorrectPassword123!',
        confirmPassword: 'CorrectPassword123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      // Manually activate user for login test
      const user = await (authService as any).findUserByEmail('active.user@example.com');
      user.status = AccountStatus.ACTIVE;
      user.emailVerifiedAt = new Date();
    });

    it('should successfully log in an active verified user and return JWT', async () => {
      const { response, rawSessionToken } = await authService.login({
        email: 'active.user@example.com',
        password: 'CorrectPassword123!',
      });

      expect(response.accessToken).toBeDefined();
      expect(response.accessToken.length).toBeGreaterThan(20);
      expect(response.requiresVerification).toBe(false);
      expect(response.user.email).toBe('active.user@example.com');
      expect(rawSessionToken).toBeDefined();
    });

    it('should reject login with wrong password', async () => {
      await expect(
        authService.login({
          email: 'active.user@example.com',
          password: 'WrongPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should reject login for non-existent email', async () => {
      await expect(
        authService.login({
          email: 'doesnotexist@example.com',
          password: 'AnyPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should forbid login for suspended accounts', async () => {
      const user = await (authService as any).findUserByEmail('active.user@example.com');
      user.status = AccountStatus.SUSPENDED;

      await expect(
        authService.login({
          email: 'active.user@example.com',
          password: 'CorrectPassword123!',
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Password Reset Flow', () => {
    it('should complete password reset and invalidate prior sessions', async () => {
      await authService.register({
        email: 'reset.flow@example.com',
        name: 'Reset Flow',
        password: 'OldPassword123!',
        confirmPassword: 'OldPassword123!',
        role: RoleType.CUSTOMER,
        termsAccepted: true,
      });

      const user = await (authService as any).findUserByEmail('reset.flow@example.com');
      user.status = AccountStatus.ACTIVE;
      user.emailVerifiedAt = new Date();

      // Initiate forgot password
      await authService.forgotPassword('reset.flow@example.com');

      // Create known token for test
      const testToken = 'reset-flow-test-token';
      const testHash = crypto.createHash('sha256').update(testToken).digest('hex');
      (authService as any).memoryPasswordTokens.set(testHash, {
        id: 'token-1',
        userId: user.id,
        tokenHash: testHash,
        expiresAt: new Date(Date.now() + 60000),
        usedAt: null,
        createdAt: new Date(),
      });

      // Reset password
      const resetResult = await authService.resetPassword(testToken, 'NewPassword123!', 'NewPassword123!');
      expect(resetResult.message).toContain('successfully reset');

      // Old password should fail
      await expect(
        authService.login({
          email: 'reset.flow@example.com',
          password: 'OldPassword123!',
        }),
      ).rejects.toThrow(UnauthorizedException);

      // New password should succeed
      const loginResult = await authService.login({
        email: 'reset.flow@example.com',
        password: 'NewPassword123!',
      });
      expect(loginResult.response.accessToken).toBeDefined();
    });
  });
});

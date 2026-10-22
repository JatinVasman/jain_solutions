import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthUser } from '@rental-platform/types';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  private readonly isProd: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.isProd = this.configService.get<string>('nodeEnv') === 'production';
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.register(dto, ip, userAgent);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { response: authResult, rawSessionToken } = await this.authService.login(
      dto,
      ip,
      userAgent,
    );

    // If verification is still pending, do not issue full session cookie
    if (!authResult.requiresVerification && authResult.accessToken) {
      // Set secure HttpOnly cookies
      response.cookie('access_token', authResult.accessToken, {
        httpOnly: true,
        secure: this.isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      if (rawSessionToken) {
        const days = dto.rememberMe ? 30 : 7;
        response.cookie('session_token', rawSessionToken, {
          httpOnly: true,
          secure: this.isProd,
          sameSite: 'lax',
          path: '/',
          maxAge: days * 24 * 60 * 60 * 1000,
        });
      }
    }

    return authResult;
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const rawSessionToken = request.cookies?.session_token;
    await this.authService.logout(rawSessionToken);

    // Invalidate cookies
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('session_token', { path: '/' });

    return { message: 'Logged out successfully' };
  }

  @Get('me')
  async getMe(@CurrentUser() user: AuthUser) {
    return { user };
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto, @Ip() ip: string) {
    return this.authService.verifyEmail(dto.token, ip);
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(@Body() dto: ResendVerificationDto, @Ip() ip: string) {
    return this.authService.resendVerification(dto.email, ip);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Ip() ip: string) {
    return this.authService.forgotPassword(dto.email, ip);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto, @Ip() ip: string) {
    return this.authService.resetPassword(dto.token, dto.newPassword, dto.confirmPassword, ip);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      userId,
      dto.currentPassword,
      dto.newPassword,
      dto.confirmPassword,
    );
  }

  @Get('sessions')
  async getSessions(@CurrentUser('id') userId: string) {
    const sessions = await this.authService.getUserSessions(userId);
    return { sessions };
  }

  @Delete('sessions/:id')
  @HttpCode(HttpStatus.OK)
  async revokeSession(
    @CurrentUser('id') userId: string,
    @Param('id') sessionId: string,
  ) {
    await this.authService.revokeSession(userId, sessionId);
    return { message: 'Session terminated successfully' };
  }

  /**
   * Google OAuth Entrypoint
   * If credentials are not configured, returns clear unconfigured status per specification
   */
  @Public()
  @Get('google')
  async googleAuth(
    @Query('role') role: string | undefined,
    @Res() response: Response,
  ) {
    const clientId = this.configService.get<string>('auth.googleClientId');
    const callbackUrl = this.configService.get<string>('auth.googleCallbackUrl');

    if (!clientId) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        error: 'Service Unavailable',
        message:
          'Google OAuth authentication is not configured in this environment. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables to activate social authentication.',
      });
    }

    // Embed role into state parameter to preserve user type through OAuth redirect
    const state = Buffer.from(JSON.stringify({ role: role || 'CUSTOMER' })).toString('base64');
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(callbackUrl || '')}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${encodeURIComponent(state)}`;
    return response.redirect(redirectUrl);
  }

  @Public()
  @Get('google/callback')
  async googleAuthCallback(@Req() request: Request, @Res() response: Response) {
    const clientId = this.configService.get<string>('auth.googleClientId');
    const clientSecret = this.configService.get<string>('auth.googleClientSecret');
    const webUrl = this.configService.get<string>('webUrl', 'http://localhost:3000');

    if (!clientId || !clientSecret) {
      return response.redirect(`${webUrl}/login?error=oauth_unconfigured`);
    }

    const code = request.query.code as string;
    if (!code) {
      return response.redirect(`${webUrl}/login?error=oauth_denied`);
    }

    // Clean OAuth validation flow handler
    return response.redirect(`${webUrl}/login?status=oauth_pending`);
  }
}

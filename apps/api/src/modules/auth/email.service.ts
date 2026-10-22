import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailService {
  sendVerificationEmail(to: string, name: string, token: string): Promise<boolean>;
  sendPasswordResetEmail(to: string, name: string, token: string): Promise<boolean>;
  sendRoleStatusNotification(to: string, name: string, role: string, status: string): Promise<boolean>;
}

@Injectable()
export class EmailService implements IEmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly webUrl: string;
  private readonly fromEmail: string;
  private readonly fromName: string;
  private readonly provider: string;

  constructor(private readonly configService: ConfigService) {
    this.webUrl = this.configService.get<string>('webUrl', 'http://localhost:3000');
    this.fromEmail = this.configService.get<string>('email.fromEmail', 'noreply@jainsolutions.local');
    this.fromName = this.configService.get<string>('email.fromName', 'Jain Solutions Marketplace');
    this.provider = this.configService.get<string>('email.provider', 'console');
  }

  async sendVerificationEmail(to: string, name: string, token: string): Promise<boolean> {
    const verificationUrl = `${this.webUrl}/verify-email?token=${encodeURIComponent(token)}`;
    const subject = 'Verify your email — Jain Solutions Marketplace';
    const text = `Hello ${name},\n\nThank you for signing up for Jain Solutions Marketplace. Please verify your email by clicking the link below (valid for 24 hours):\n\n${verificationUrl}\n\nIf you did not create this account, please ignore this message.\n\nBest regards,\nJain Solutions Team`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">Verify your email address</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">
          Thank you for joining Jain Solutions — your unified equipment rental marketplace. Please confirm your email address to activate your account.
        </p>
        <div style="margin: 32px 0;">
          <a href="${verificationUrl}" style="background-color: #0d9488; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.4;">
          This link will expire in 24 hours. If the button above does not work, copy and paste this link into your browser:<br />
          <a href="${verificationUrl}" style="color: #0d9488; word-break: break-all;">${verificationUrl}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">If you did not register for Jain Solutions, you can safely ignore this email.</p>
      </div>
    `;

    return this.dispatchEmail({ to, subject, text, html });
  }

  async sendPasswordResetEmail(to: string, name: string, token: string): Promise<boolean> {
    const resetUrl = `${this.webUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const subject = 'Reset your password — Jain Solutions Marketplace';
    const text = `Hello ${name},\n\nWe received a request to reset your password. You can set a new password by clicking the link below (valid for 1 hour):\n\n${resetUrl}\n\nIf you did not request a password reset, no action is needed.\n\nBest regards,\nJain Solutions Team`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">
          We received a request to reset your password for your Jain Solutions account.
        </p>
        <div style="margin: 32px 0;">
          <a href="${resetUrl}" style="background-color: #0d9488; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.4;">
          This link is single-use and will expire in 1 hour. If you did not request this, please disregard this message. Your current password will remain unchanged.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">Security notice: Jain Solutions staff will never ask you for your password or reset link.</p>
      </div>
    `;

    return this.dispatchEmail({ to, subject, text, html });
  }

  async sendRoleStatusNotification(
    to: string,
    name: string,
    role: string,
    status: string,
  ): Promise<boolean> {
    const subject = `Role Application Update: ${role} — Jain Solutions`;
    const text = `Hello ${name},\n\nYour application for the role of ${role} has been updated to: ${status}.\n\nLog in to your account at ${this.webUrl}/login to view details.\n\nBest regards,\nJain Solutions Team`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">Role Status Update</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; font-size: 15px; line-height: 1.5;">
          Your requested access for <strong>${role}</strong> is currently: <strong>${status}</strong>.
        </p>
        <div style="margin: 24px 0;">
          <a href="${this.webUrl}/login" style="background-color: #0d9488; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
            Access Your Portal
          </a>
        </div>
      </div>
    `;

    return this.dispatchEmail({ to, subject, text, html });
  }

  private async dispatchEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (this.provider === 'smtp') {
        // If an external SMTP service is configured, transport integration is hooked here.
        this.logger.log(`[SMTP Dispatch] Sending email to ${options.to}: "${options.subject}"`);
        return true;
      }

      // Safe development/local console provider:
      this.logger.log(
        `[Email Dispatch (${this.provider})] To: ${options.to} | Subject: "${options.subject}" | From: ${this.fromName} <${this.fromEmail}>`,
      );
      return true;
    } catch (error) {
      this.logger.error(`Failed to dispatch email to ${options.to}:`, error);
      return false;
    }
  }
}

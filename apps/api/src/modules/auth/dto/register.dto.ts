import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsBoolean,
  Equals,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RoleType } from '@rental-platform/types';

// Only public roles are allowed at registration. Administrative roles are explicitly forbidden.
export const ALLOWED_REGISTRATION_ROLES = [
  RoleType.CUSTOMER,
  RoleType.PRODUCT_OWNER,
  RoleType.PARTNER,
  RoleType.FREELANCER,
  RoleType.JOB_SEEKER,
] as const;

export type RegistrationRole = (typeof ALLOWED_REGISTRATION_ROLES)[number];

export class RegisterDto {
  @IsEmail({}, { message: 'A valid email address is required' })
  @Transform(({ value }: { value: string }) => value?.trim().toLowerCase())
  email!: string;

  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Transform(({ value }: { value: string }) => value?.trim())
  name!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(72, { message: 'Password cannot exceed 72 characters' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password confirmation is required' })
  confirmPassword!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }: { value?: string }) => value?.trim())
  phone?: string;

  @IsEnum(ALLOWED_REGISTRATION_ROLES, {
    message: 'Role must be one of: CUSTOMER, PRODUCT_OWNER, PARTNER, FREELANCER, JOB_SEEKER. Administrative roles cannot be registered publicly.',
  })
  role!: RegistrationRole;

  @IsBoolean({ message: 'Terms of service acknowledgement must be a boolean' })
  @Equals(true, { message: 'You must accept the terms of service and privacy policy to register' })
  termsAccepted!: boolean;
}

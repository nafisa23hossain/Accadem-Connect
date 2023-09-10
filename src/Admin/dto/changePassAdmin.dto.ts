import { IsEmail, MinLength } from 'class-validator';

export class PasswordChangeAdminDto {
  oldPassword: string;
  @MinLength(7, { message: 'Password Length Should be More than 7' })
  newPassword: string;
}

export class PasswordForgetAdminDto {
  @IsEmail({}, { message: 'Choose a valid email' })
  email: string;
}

export class ForgetPassAdminDto {
  otp: string;
  @MinLength(7, { message: 'Password Length Should be More than 7' })
  newPassword: string;
}

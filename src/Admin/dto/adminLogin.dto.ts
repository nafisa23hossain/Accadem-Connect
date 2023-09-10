import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class AdminLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  @MinLength(7, { message: 'Password Length Should be More than 7' })
  password: string;
}

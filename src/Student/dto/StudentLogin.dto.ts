import { IsEmail, IsString, MinLength } from 'class-validator';

export class StudentLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  @MinLength(7, {
    message: 'Password length should be equal or greater than 7',
  })
  password: string;
}

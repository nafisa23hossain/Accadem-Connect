import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class ModeratorDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsNumber()
  @IsNotEmpty()
  age: string;
  @IsNotEmpty()
  @Length(11)
  phone: string;
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;
  @IsString()
  gender: string;
  //@IsDate()
  createdDate: Date;
  @IsString()
  education: string;
  //@IsDate()
  updatedDate: Date;
  @MinLength(7, {
    message: 'Minimum length of the password should be equal or greater than 7',
  })
  password: string;
  profileImg: string;
  status: string;
  createdBy: number;
}

export class ModeratorLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not a string' })
  @MinLength(7, {
    message: 'Minimum length of the password should be equal or greater than 7',
  })
  password: string;
}
export class PasswordChangeModeratorDto {
  oldPassword: string;
  @MinLength(7, {
    message: 'Minimum length of the password should be equal or greater than 7',
  })
  newPassword: string;
}

export class PasswordForgetModeratorDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
}

export class ForgetPassModeratorDto {
  otp: string;
  @MinLength(7, {
    message: 'Minimum length of the password should be equal or greater than 7',
  })
  newPassword: string;
}

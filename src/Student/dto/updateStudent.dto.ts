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
  minLength,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsNumber()
  @IsNotEmpty()
  age: string;
  @IsNotEmpty()
  @Length(11)
  phone: string;
  @IsString()
  gender: string;
  //@IsDate()
  updatedDate: Date;
  //profileImg: string;
}
export class PasswordForgetStudentDto {
  @IsEmail()
  email: string;
}

export class ForgetPassStudentDto {
  otp: string;
  @MinLength(7, {
    message: 'Password length should be equal or greater than 7',
  })
  newPassword: string;
}

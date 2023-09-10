import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsNumber()
  @IsNotEmpty()
  age: string;
  // age: number;
  @IsNotEmpty()
  @Length(11)
  phone: string;
  @IsEmail({}, { message: 'Email is not correct' })
  email: string;
  @IsString()
  gender: string;
  //@IsDate()
  createdDate: Date;
  //@IsDate()
  updatedDate: Date;
  @MinLength(7, {
    message: 'Password length should be equal or greater than 7',
  })
  password: string;
  profileImg: string;
  createdByAdmin: number;
  createdByModerator: number;
}

export class PasswordChangeStudentDto {
  @IsString()
  oldPassword: string;
  @MinLength(7, {
    message: 'Password length should be equal or greater than 7',
  })
  newPassword: string;
}

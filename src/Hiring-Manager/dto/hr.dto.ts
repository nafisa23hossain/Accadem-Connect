import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class HrDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  // @IsNumber()
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
  //@IsDate()
  updatedDate: Date;
  @MinLength(7, {
    message: 'Password length should be greater than or equal 7 ',
  })
  password: string;
  profileImg: string;
  createdByAdmin: number;
  createdByModerator: number;
}

export class HrLoginDto {
  @IsEmail({}, { message: 'It is not an email' })
  email: string;
  @IsString({ message: 'It is not an string' })
  password: string;
}
export class PasswordChangeHrDto {
  oldPassword: string;
  @MinLength(7)
  newPassword: string;
}

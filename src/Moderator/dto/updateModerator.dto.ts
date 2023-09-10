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

export class UpdateModeratorDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsNumber()
  age: string;
  @IsNotEmpty()
  @Length(11)
  phone: string;
  @IsString()
  gender: string;
  @IsString()
  education: string;
  //@IsDate()
  updatedDate: Date;
  //profileImg: string;
}

export class ProfileModeratorDto {
  name: string;
  age: string;
  phone: string;
  email: string;
  gender: string;
  createdDate: Date;
  education: string;
  updatedDate: Date;
  status: string;
  moderator: number;
}

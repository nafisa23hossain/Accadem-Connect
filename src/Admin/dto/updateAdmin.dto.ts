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

export class UpdateAdminDTO {
  @IsString()
  @Matches(/^[A-Z][A-Za-z ]+$/)
  name: string;
  //@IsString()
  age: number;
  @Length(11)
  phone: string;
  @IsString()
  gender: string;
  //@IsDate()
  updatedDate: Date;
  profileImg: string;
}

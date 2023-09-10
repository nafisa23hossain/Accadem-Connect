import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class OfferDTO {
  @IsString()
  title: string;
  @IsString()
  letter: string;
  createdDate: Date;
  student: number;
  //@IsNotEmpty()
  job: number;
  hr: number;
}

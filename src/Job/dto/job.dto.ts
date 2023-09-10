import { IsDate, IsString } from 'class-validator';

export class JobDto {
  @IsString()
  title: string;
  @IsString()
  details: string;

  createdDate: Date;

  updatedDate: Date;
  hr: number;
}

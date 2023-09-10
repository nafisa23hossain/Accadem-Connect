import { IsDate, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  @IsDate()
  createdDate: Date;
  hr: number;
  student: number;
  handledBy: number;
}

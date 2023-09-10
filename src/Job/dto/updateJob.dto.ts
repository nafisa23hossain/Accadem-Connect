import { IsDate, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  updatedDate: Date;
}

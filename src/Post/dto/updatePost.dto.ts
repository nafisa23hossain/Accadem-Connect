import { IsDate, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;
  @IsString()
  details: string;
  updatedDate: Date;
}

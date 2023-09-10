import { IsDate, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;
  @IsString()
  details: string;

  createdDate: Date;

  updatedDate: Date;
  student: number;
}

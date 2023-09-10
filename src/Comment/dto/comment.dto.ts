import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  text: string;
  //@IsDate()
  createdDate: Date;
  //@IsNotEmpty()
  post: number;
  hr: number;
  student: number;
  parentComment: number;
}

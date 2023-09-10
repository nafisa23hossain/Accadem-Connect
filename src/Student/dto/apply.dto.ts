import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyDto {
  @IsNotEmpty()
  @IsNumber()
  job: number;
}

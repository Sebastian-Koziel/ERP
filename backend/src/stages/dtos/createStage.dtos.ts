import { IsString } from 'class-validator';

export class CreateStageDto {
  @IsString()
  name: string;

  @IsString()
  comment: string;
}
import { IsString, IsArray, IsBoolean } from 'class-validator';

export class CreateStageDto {
  @IsString()
  name: string;

  @IsString()
  comment: string;
}
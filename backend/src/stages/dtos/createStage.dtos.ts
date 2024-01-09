import { IsString, IsArray, IsBoolean } from 'class-validator';

export class CreateStageDto {
  @IsString()
  name: string;

  @IsString()
  comment: string;

  @IsBoolean()
  active: boolean;

  @IsArray()
  @IsString({ each: true }) // Ensure each element in the array is a string
  active_in: string[];

}
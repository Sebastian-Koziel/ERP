import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  name: string;

  @IsString()
  comments: string;

  @IsString()
  units_type: string;

  @IsNumber()
  units: number;

  @IsNumber()
  timePerUnit: number;

  @IsString()
  stage_id: string;

  @IsString()
  workSpace_type: string;

  @IsBoolean()
  active: boolean;

  @IsArray()
  @IsString({ each: true }) // Ensure each element in the array is a string
  active_in: string[];
}
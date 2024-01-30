import { IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  name: string;

  @IsString()
  comments: string;

  @IsString()
  workSpaceTypeId: string;

  @IsString({ each: true })
  usedIn: string[];
}
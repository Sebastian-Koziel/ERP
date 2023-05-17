import { IsString } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  name: string;

  @IsString()
  stage_id: string;

  @IsString()
  workSpace_type: string;
}
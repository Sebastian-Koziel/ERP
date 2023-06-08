import { IsString } from 'class-validator';

export class UpdateStageDto {
  @IsString()
  name: string;
  
}
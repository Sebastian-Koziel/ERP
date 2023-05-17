import { IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  name: string;

  operations: string[];

}
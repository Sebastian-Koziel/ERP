import { IsString } from 'class-validator';

export class CreateWorkspaceTypeDto {
  @IsString()
  name: string;
  @IsString()
  comment:  string;
}
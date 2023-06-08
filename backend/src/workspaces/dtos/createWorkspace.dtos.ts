import { IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;
  @IsString()
  comment:  string;
  @IsString()
  addedBy: string;
  @IsString()
  addedWhen:  string;
}
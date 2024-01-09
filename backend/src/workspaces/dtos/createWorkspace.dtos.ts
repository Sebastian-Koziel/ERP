import { IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;
  @IsString()
  comment:  string;
  @IsString()
  stage_id:  string;
  @IsString()
  workspaceType_id:  string;

}
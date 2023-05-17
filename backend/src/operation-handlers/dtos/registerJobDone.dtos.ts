import { IsString } from 'class-validator';

export class RegisterJobDoneDto {
  @IsString()
  operationHandler_id: string;

  qtyDone: number;
}
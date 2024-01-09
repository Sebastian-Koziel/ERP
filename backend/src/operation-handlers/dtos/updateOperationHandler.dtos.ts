import { IsString } from 'class-validator';

export class UpdateOperationHandlerDto {
  avaiable: boolean;
  doneAt: number;
  qtyDone: number;
}
import { IsString } from 'class-validator';
import { Operation } from 'src/operations/interfaces/operation.interface';


export class CreateProductDto {
  @IsString()
  name: string;

  comment: string;

  operations: [
    Operation
  ];

}
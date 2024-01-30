import { IsNumber, IsString } from 'class-validator';

export class ProductOperation {
  @IsString()
  _id: string
  @IsString()
  name:string
  @IsString()
  operation_id : string
  @IsNumber()
  timePerUnit: number
  @IsString()
  parent_id: string
  root: boolean
}

export class ProductComponent {
  @IsString()
  _id: string
  @IsString()
  component_id: string
  @IsString()
  name:string
  @IsString()
  parent_id: string
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  comment: string;

  operations: [
    ProductOperation
  ];

  components: [
    ProductComponent
  ]

  usedIn: [
    string
  ]

}
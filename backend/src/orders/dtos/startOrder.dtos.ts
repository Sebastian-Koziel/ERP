import { IsString } from "class-validator";

export class StartOrderDto {

   @IsString()
    orderId: string;
};

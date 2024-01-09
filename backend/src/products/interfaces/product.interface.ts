import { Document } from "mongoose";
import { Operation } from "src/operations/interfaces/operation.interface";

export interface Product extends Document {
    name : string,
    comment: string,
    qty: number,
    productType_id: string,
    operations : [
        Operation
    ],
    
}
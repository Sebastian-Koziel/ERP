import { Document } from "mongoose";
import { Operation } from "src/operations/interfaces/operation.interface";

export interface Product extends Document {
    name : String,
    comment: String,
    qty: Number,
    operations : [
        Operation
    ],
    
}
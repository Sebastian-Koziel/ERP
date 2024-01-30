import { Document } from "mongoose";
import { ProductComponent, ProductOperation } from "../dtos/create-product.dtos";

export interface Product extends Document {
    _id: string,
    name : string,
    comment: string,
    operations : [
        ProductOperation
    ],
    components: [
        ProductComponent
    ],
    usedIn: [string]
    
}
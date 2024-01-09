import { Operation } from "../../operations/Interfaces/Operations.interface";

export interface CreateProduct {
    
    name : string,
    comment: string,
    qty: number,
    productType_id: string,
    operations : [
        Operation
    ],
    
    
}
import { Operation } from "../../operations/Interfaces/Operations.interface";


export interface Product {
    _id: string
    name : string
    comment: string
    productType_id: string
    
    operations :  Operation[]
}
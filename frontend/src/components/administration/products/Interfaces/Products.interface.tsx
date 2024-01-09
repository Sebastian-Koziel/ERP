import { Operation } from "../../operations/Interfaces/Operations.interface";


export interface Product {
    _id: string
    name : string
    comment: string
    qty: number
    productType_id: string
    
    operations :  Operation[]
}
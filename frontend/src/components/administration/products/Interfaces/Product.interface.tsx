
import { ProductComponent } from "./ProductComponent";
import { ProductOperation } from "./ProductOperation";


export interface Product {
    _id: string
    name : string
    comment: string
    operations :  ProductOperation[]
    components : ProductComponent[]
    usedIn: [string]
}
import { ProductComponent } from "./ProductComponent";
import { ProductOperation } from "./ProductOperation";


export interface CreateProduct {
    
    name : string,
    comment: string,
    operations : [
        ProductOperation
    ],
    components: [
        ProductComponent
    ]
    
    
}
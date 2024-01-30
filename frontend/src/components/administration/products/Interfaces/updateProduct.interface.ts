import { ProductComponent } from "./ProductComponent"
import { ProductOperation } from "./ProductOperation"

export interface UpdateProductData {
    id: string
    attr: {
        name : string,
        comment: string,
        operations: [ProductOperation],
        components: [ProductComponent]
        
    }
}
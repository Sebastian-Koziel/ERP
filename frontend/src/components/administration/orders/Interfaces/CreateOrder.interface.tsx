
import { ProductForOrder } from "./ProductForOrder"

export interface CreateOrderData {
    name: string
    comment: string
    externalOrderNo: string
    reqDeliveryDate: Date | null
    products: ProductForOrder[]
    
}
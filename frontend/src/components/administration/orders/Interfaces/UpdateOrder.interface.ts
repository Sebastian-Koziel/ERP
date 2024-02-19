import { ProductForOrder } from "./ProductForOrder.interface"

export interface UpdateOrderData {
    id: string
    attr: {
        name: string,
        comment: string,
        externalOrderNo: string,
        reqDeliveryDate: number | null,
        products: ProductForOrder[]
        
        
    }
}
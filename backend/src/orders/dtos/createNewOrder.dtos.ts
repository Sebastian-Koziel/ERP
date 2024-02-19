import { Product } from "src/products/interfaces/product.interface"

export class CreateOrderDto {
        name: string
        orderNo: string
        products_types: [
                {
                        qty: number,
                        product_type: string
                }
                
        ]
        products: [
                Product
        ]   
        
};


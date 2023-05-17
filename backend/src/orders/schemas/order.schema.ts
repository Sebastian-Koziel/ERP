import * as mongoose from 'mongoose';
import { ProductSchema } from 'src/products/schemas/product.schema';


export const OrderSchema = new mongoose.Schema({

    name: {
        type: String
    },
    orderNo: {
        type: String
    },
    products: [
        ProductSchema
    ]    
});
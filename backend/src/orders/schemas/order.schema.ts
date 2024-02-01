import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({

    name: {
        type: String
    },
    comment: {
        type: String
    },
    reqDeliveryDate: {
        type: Date
    },
    externalOrderNo: {
        type: String
    },
    products: [
        {productId: {
            type: String
        },
         qty: {
            type: Number
        }
        }
    ]
});
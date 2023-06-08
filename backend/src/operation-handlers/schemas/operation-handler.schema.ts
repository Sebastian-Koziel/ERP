import * as mongoose from 'mongoose';

export const OperationHandlerSchema = new mongoose.Schema({

    order_id: {
        type: String
    },
    product_id: {
        type: String
    },
    name: {
        type: String
    },
    qty: {
        type: Number
    },
    stage_id: {
        type: String
    },
    workSpace_id: {
        type: String
    },
    nextOperation_id: {
        type: String
    },
    previousOperation_id: {
        type: String
    }, 
    avaiable : {
        type: Boolean,
        default: false
    },
    doneAt: {
        type: Number,
        default: 0
    }
});
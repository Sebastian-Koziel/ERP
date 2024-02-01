import * as mongoose from 'mongoose';

export const OperationHandlerSchema = new mongoose.Schema({

    order_id: {
        type: String
    },
    orderLine_id: {
        type: String
    },
    name: {
        type: String
    },
    totalQty: {
        type: Number
    },



    stage_id: {
        type: String,
        default: ''
    },
    workSpace_id: {
        type: String,
        default: ''
    },



    parentOperationHandler_id: {
        type: String
    },
    childrenOperationHandlers: {
        type: Array,
        default: []
    }    
    
    
});
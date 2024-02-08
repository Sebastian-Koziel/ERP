import * as mongoose from 'mongoose';

export const BatchSchema = new mongoose.Schema({

    operationHandler_id: {
        type: String
    },
    nextOperationHandler_id: {
        type: String
    },
    qty: {
        type: Number
    },
    started: {
        type: Date
    },
    finished: {
        type: Date
    },
    plannedStart: {
        type: Date
    },
    plannedEnd: {
        type: Date
    }



    
});
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
    avaiableQty: {
        type: Number,
        default: 0
    },
    timePerPiece: {
        type: Number,
        default: 0
    },
    workspaceType_id: {
        type: String
    },


    //plan
    plannedStart: {
        type: Number,
        default: null
    },
    plannedFinish: {
        type: Number,
        default: null
    },
    stage_id: {
        type: String,
        default: ''
    },
    workSpace_id: {
        type: String,
        default: ''
    },
    calculated: {
        type: Boolean,
        default: false
    },

    //progress
    startedAt: {
        type: Number,
        default: 0
    },
    inProgress:{ 
        type: Boolean,
        default: false
    },

    //architecture
    parentOperationHandler_id: {
        type: String
    },
    childrenOperationHandlers: {
        type: Array,
        default: []
    },
    root: {
        type: Boolean,
        default: false
    }
    
    
});
import * as mongoose from 'mongoose';

export const OperationSchema = new mongoose.Schema({
    //general info
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    comment: {
        type: String,
        default: ''
    },

    //time
    units_type: {  //to be used in configurator
        type: String,
        default: ''
    },
    units: {    //to be used in configurator
        type: Number,
        default: 0,
    },
    timePerUnit: {
        type: Number,
        default: 0,
    },

    //placament
    stage_id: {
        type: String,
        default: ''
    },
    workSpace_type:{
        type: String,
        require: [true, "Pleae provide a workspace type"],
    },

    active: {
        type: Boolean,
        default: false,
    },
    active_in: {
        type: [String],
        default: [],
    }
});
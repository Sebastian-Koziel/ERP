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

    workSpaceTypeId:{
        type: String,
        require: [true, "Pleae provide a workspace type"],
    },
    usedIn: {
        type: Array,
        default:[]
    }
});
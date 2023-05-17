import * as mongoose from 'mongoose';

export const OperationSchema = new mongoose.Schema({
    //general info
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    //placament
    stage_id: {
        type: String
    },
    workSpace_type:{
        type: String,
        require: [true, "Pleae provide a workspace type"],
    }
});
import mongoose from 'mongoose';

export const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a name for a new workspace"],
    },
    comment: {
        type: String
    },
    
    stage_id: {
        type: String,
        require: [true, "Please provide a stage for a new workspace"],
    },

    workspaceType_id: {
        type: String,
        require: [true, "Please provide a type for a new workspace"],
    },

    //plan
    avaiableForJobAt: {
        type: Number,
        default: null
    }

})
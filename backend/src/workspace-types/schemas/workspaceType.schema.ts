import mongoose from 'mongoose';

export const WorkspaceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a name for a new workspace type"],
    },
    comment: {
        type: String
    },
    

})
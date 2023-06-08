import mongoose, * as moongose from 'mongoose';

export const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a name for a new workspace"],
    },
    comment: {
        type: String
    },
    addedBy: {
        type: String
    },
    addedWhen: {
        type: String
    }

})
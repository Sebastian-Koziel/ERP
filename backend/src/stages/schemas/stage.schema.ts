import * as mongoose from 'mongoose';

export const StageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    comment: {
        type: String
    },

    //for removal - so we dont erase used one
    active: {
        type: Boolean,
        default: false,
    },
    active_in: {
        type: [String],
        default: [],
    }
});
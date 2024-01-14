import * as mongoose from 'mongoose';

export const StageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    comment: {
        type: String
    }

});
import * as mongoose from 'mongoose';

export const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
        unique: true
    },
    operations: [
        {
            type: String
        }
    ]
});
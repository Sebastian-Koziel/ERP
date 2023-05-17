import * as mongoose from 'mongoose';
import { OperationSchema } from 'src/operations/schemas/operation.schema';

const ProductSchema_operations = new mongoose.Schema(OperationSchema.obj, { _id: false });

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    comment: {
        type: String
    },
    qty: {
        type: Number,
        default: null
    },
    operations: [
        ProductSchema_operations
    ]   
});
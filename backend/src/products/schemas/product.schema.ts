import * as mongoose from 'mongoose';
import { OperationSchema } from 'src/operations/schemas/operation.schema';

const ProductSchema_operations = new mongoose.Schema(OperationSchema.obj, { _id: false });

const ProductComponentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    component_id: { type: String, required: true },
    name: { type: String, required: true },
    parent_id: { type: String, required: true },
  });
  
  const ProductOperationSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    operation_id: { type: String, required: true },
    timePerUnit: { type: Number, required: true },
    parent_id: { type: String },
    root: { type: Boolean },
  });

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    comment: {
        type: String
    },
    operations: [
        {type: ProductOperationSchema}
      ],
    
      components: [
        {type: ProductComponentSchema }
      ],
    
      usedIn: {
        type: Array,
        default: []
      }
});


import { Document } from "mongoose";

export interface Component extends Document {
    name : String,
    operations : String[]
}
import { Document } from "mongoose";

export interface Stage extends Document {
    name : String,
    comment: String,
    
    active: false,
    active_in: [String]
}
import { Document } from "mongoose";

export interface Stage extends Document {
    name : String,
    comment: String,
    usedIn: string[]
    
}
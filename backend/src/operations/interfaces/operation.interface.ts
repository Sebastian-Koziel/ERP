import { Document } from "mongoose";

export interface Operation extends Document {
    name : String,
    comment: String,

    units_type: String,
    units: String,
    timePerUnit: Number,
        
    stage_id: String,
    workSpace_type: String,

    active: false,
    active_in: [String]
}
import { Document } from "mongoose";

export interface Operation extends Document {
    name : String,
    stage_id: String,
    workSpace_type: String

}
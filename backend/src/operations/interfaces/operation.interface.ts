import { Document } from "mongoose";

export interface Operation extends Document {
    name : String,
    comment: String,
    workSpaceTypeId: String,
    usedIn: string[],
    timePerPiece: number
   
}
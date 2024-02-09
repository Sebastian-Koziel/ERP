import { Document } from "mongoose";

export interface Operation extends Document {
    name : string,
    comment: string,
    workSpaceTypeId: string,
    usedIn: string[],
    timePerPiece: number
   
}
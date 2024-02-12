import { Document } from "mongoose";

export interface Workspace extends Document {
    _id: string
    name: string
    comment:  string
    
    stage_id: string
    workspaceType_id: string

    //plan
    avaiableForJobAt: number
}
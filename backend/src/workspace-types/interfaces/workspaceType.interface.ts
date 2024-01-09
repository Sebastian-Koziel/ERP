import { Document } from "mongoose";

export interface WorkspaceType extends Document {
    name: string
    comment:  string
    
}
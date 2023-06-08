import { Document } from "mongoose";

export interface Workspace extends Document {
    name: string
    comment:  string
    addedBy: string
    addedWhen:  string
}
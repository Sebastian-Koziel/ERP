import { Document } from "mongoose";
import { Workspace } from "./workspace.interface";



export interface UpdateWorkspace extends Document {
    id: string,
    attr: Partial<Workspace>
   
}
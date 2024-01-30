import { Document } from "mongoose";
import { Operation } from "./operation.interface";



export interface UpdateOperationData extends Document {
    id: string,
    attr: Partial<Operation>
   
}
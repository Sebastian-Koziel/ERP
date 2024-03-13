import { Document } from "mongoose";


export interface finishOperationHandlerData extends Document {
    id: string,
    qty: number,
    time: number 
}
import { Document } from "mongoose";
import { OperationHandler } from "../interfaces/operationHandler.interface";


export interface finishOperationHandlerData extends Document {
    id: string,
    attr: Partial<OperationHandler>
   
}
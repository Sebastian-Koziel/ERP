import { Document } from "mongoose";
import { Stage } from "./stage.interface";


export interface UpdateStage extends Document {
    id: string,
    attr: Partial<Stage>
   
}
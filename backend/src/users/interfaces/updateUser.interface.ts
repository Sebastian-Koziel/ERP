import { Document } from "mongoose";
import { User } from "./user.interface";

export interface UpdateUser extends Document {
    id: string,
    attr: Partial<User>
   
}
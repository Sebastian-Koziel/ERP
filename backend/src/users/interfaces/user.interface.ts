import { Document } from "mongoose";

export interface User extends Document {
    _id: String,
    login : String,
    password: String,
    name:  String
    surname:  String
    role: String

    access: {
        defaultStartPage: String
        production: {
            stagesAccess: String[]
        }
    }
   
}
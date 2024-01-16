import { Document } from "mongoose";

export interface User extends Document {
    _id: string,
    login : String,
    password: String,
    name:  String
    surname:  String
    role: String

    access: {
        defaultStartPage: String
        production: {
            generalAccess: Boolean
            stagesAccess: String[]
        },
        administration: {
            generalAccess: Boolean
            companySetup: Boolean
        }
    }
   
}
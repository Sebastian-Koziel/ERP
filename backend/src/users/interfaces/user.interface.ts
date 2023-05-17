import { Document } from "mongoose";

export interface User extends Document {
    login : String,
    password: String,
    name:  String
    surname:  String
    access: {
        role:  String,
        users:{
            usersTab_access: Boolean
            usersTab_addingUser: Boolean
        },
        stages: {
            stagesTab_access: Boolean,
        }
    }
   
}
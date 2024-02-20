import { Document } from "mongoose";

export interface User extends Document {
    _id: string,
    login : String,
    password: String,
    name:  String
    surname:  String
    role: String

    access: {
        defaultStartPage: string
        production: {
            generalAccess: boolean
            stagesAccess: string[]
            mainStage: string
        },
        administration: {
            generalAccess: boolean
            companySetup: boolean
            addAndEditUsers: boolean
            editUserAcces: boolean
        },
        orders: {
            canPlaceOrder: boolean
        }
    }
   
}
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    login : {
        type : String,
        require: [true, "Pleae provide a mail"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Pleae provide a password"],
    },
    name: {
        type: String,
        require: [true, "Pleae provide a name"],
    },
    surname: {
        type: String,
        require: [true, "Pleae provide a surname"],
    },
    role: {
        type: String,
        require: [true, "Pleae provide a role"]
    },
    
    access : {
        defaultStartPage: {
            type: String,
            default: ''
        },
        production: {
            generalAccess:{
                type: Boolean,
                default: true
            },
            stagesAccess: {
                type: Array,
                default: []
            }
        },
        administration: {
            generalAccess:
            {
                type: Boolean,
                default: true
            },
            companySetup: {
                type: Boolean,
                default: true
            },
            addAndEditUsers: {
                type: Boolean,
                default: true
            },
            editUserAcces: {
                type: Boolean,
                default: true
            }
        },
        orders: {
            canPlaceOrder: {
                type: Boolean,
                default: true
            }
        }

    },
});



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
        type: String
    },
    surname: {
        type: String
    },
    access: {
        role: {
            type: String,
            default: 'Administration'
        },
        users:{
            usersTab_access: {
                type: Boolean,
                default: true,
                
            },
            usersTab_addingUser: {
                type: Boolean,
                default: true,
                
            }
        },
        stages: {
            stagesTab_access: {
                type: Boolean,
                default: true,
                
            }
        }
    }
});
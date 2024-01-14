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
            }
        }

    },
});


    /* access2: {
        
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
        },
        backEndAccess: {
            admin_company_setup_can_modify: {
                type: Boolean,
                default: true
            },
            admin_company_setup_can_read: {
                type: Boolean,
                default: true
            },
            admin_company_setup_can_delete: {
                type: Boolean,
                default: true
            },
        }
    } */

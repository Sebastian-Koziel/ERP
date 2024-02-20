
interface Access {
    
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

export const setAccessByRoles = (role:string) => {
    console.log(`adding role`);
    let access:Access = {
        defaultStartPage: '',
        production: {
            generalAccess: false,
            stagesAccess: [],
            mainStage: ''
        },
        administration: {
            generalAccess: false,
            companySetup: false,
            addAndEditUsers: false,
            editUserAcces: false
        },
        orders: {
            canPlaceOrder: false
        }
    };

    if(role === 'production') {

        access = {
            defaultStartPage: '/production',
            production: {
                generalAccess: true,
                stagesAccess: [],
                mainStage: ''
            },
            administration: {
                generalAccess: false,
                companySetup: false,
                addAndEditUsers: false,
                editUserAcces: false
            },
            orders: {
                canPlaceOrder: false
            }
        }

    }

    if(role === 'administration'){
        access = {
            defaultStartPage: '/administration',
            production: {
                generalAccess: true,
                stagesAccess: [],
                mainStage: ''
            },
            administration: {
                generalAccess: true,
                companySetup: true,
                addAndEditUsers: true,
                editUserAcces: true
            },
            orders: {
                canPlaceOrder: true
            }
        }

    }
    return access;
}
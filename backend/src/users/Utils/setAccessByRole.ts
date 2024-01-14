
interface Access {
    defaultStartPage: string;
    production: {
        generalAccess: boolean
        stagesAccess: string[];
    },
    administration: {
        generalAccess: boolean
        companySetup: boolean
    }
  }

export const setAccessByRoles = (role:string) => {
    console.log(`adding role`);
    let access:Access = {
        defaultStartPage: '',
        production: {
            generalAccess: false,
            stagesAccess: []
        },
        administration: {
            generalAccess: false,
            companySetup: false
        }
    };

    if(role === 'production') {

        access = {
            defaultStartPage: '/production',
            production: {
                generalAccess: true,
                stagesAccess: []
            },
            administration: {
                generalAccess: false,
                companySetup: false
            }
        }

    }

    if(role === 'administration'){
        access = {
            defaultStartPage: '/administration',
            production: {
                generalAccess: true,
                stagesAccess: []
            },
            administration: {
                generalAccess: true,
                companySetup: true
            }
        }

    }
    return access;
}
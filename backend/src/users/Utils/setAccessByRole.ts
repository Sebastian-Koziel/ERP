
interface Access {
    defaultStartPage: string;
    production: {
      stagesAccess: string[];
    };
  }

export const setAccessByRoles = (role:string) => {
    
    let access:Access = {
        defaultStartPage: '',
        production: {
            stagesAccess: []
        }
    };
    if(role === 'production') {

        access = {
            defaultStartPage: '/production',
            production: {
                stagesAccess: []
            }
        }

    }

    if(role === 'administration'){
        access = {
            defaultStartPage: '/administration',
            production: {
                stagesAccess: []
            }
        }

    }
    return access;
}
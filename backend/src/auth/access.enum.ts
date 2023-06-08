export enum Access {
    role,
    //users
    usersTab_access = 'access.users.usersTab_access', 
    usersTab_addingUser = 'access.users.usersTab_addingUser', 
    
    //stages
    stages_Tab_access = 'access.stages.stagesTab_access',

    //backendAccess controll
    admin_company_setup_can_modify = 'access.backEndAccess.admin_company_setup_can_modify',
    admin_company_setup_can_read = 'access.backEndAccess.admin_company_setup_can_read',
    admin_company_setup_can_delete = 'access.backEndAccess.admin_company_setup_can_delete',
}
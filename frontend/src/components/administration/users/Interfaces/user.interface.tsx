export interface User {
    
    _id:string,
    login: string,
    name : string,
    surname: string,
    
    role: string
    
    access: {
        defaultStartPage: string
        production: {
            generalAccess: boolean
            stagesAccess: string[]
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
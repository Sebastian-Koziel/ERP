export interface User {
    
    _id:string,
    login: string,
    name : string,
    surname: string,
    
    role: string
    
    access: {
        defaultStartPage: string
        production: {
            stagesAccess: string[]
        }
    }
    
    
    
}
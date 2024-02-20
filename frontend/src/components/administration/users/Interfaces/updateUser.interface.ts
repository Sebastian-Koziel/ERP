export interface UpdateUserData {
    id: string,
    attr: {
        login: string,
        name : string,
        surname: string,
        role: string,
        access: {
            production: {
                stagesAccess: string[]
                mainStage: string
            }
        }
    }
}
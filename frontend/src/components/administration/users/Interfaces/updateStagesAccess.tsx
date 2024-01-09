export interface UpdateUserStagesAccess {
    id: string,
    attr: {
        access: {
            production: {
                stagesAccess: string[]
            }
        }
    }
}
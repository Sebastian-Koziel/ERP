export interface UpdateGeneralUserInfo {
    id: string,
    attr: {
        login: string,
        name : string,
        surname: string,
        role: string
    }
}
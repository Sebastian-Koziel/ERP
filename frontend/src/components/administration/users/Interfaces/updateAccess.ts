export interface UpdateUserAccess {
    id: string,
    attr: {
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
}
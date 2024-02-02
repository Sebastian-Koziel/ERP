import { IsString } from 'class-validator';


export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
  
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  role: string;

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
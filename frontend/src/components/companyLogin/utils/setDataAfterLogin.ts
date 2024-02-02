import { storageSetToken, storageSetUser } from "../../../utils/localhostHandlers";
import { User } from "../../administration/users/Interfaces/user.interface";
import { LoginResponse } from "../Interfaces/loginResponse.interface";

export const setDataAfterLogin = (response: LoginResponse)=> {

    const token = response.access_token;
    const user:User = response.user;
    console.log(user);

    storageSetToken(token);
    storageSetUser(user);

}
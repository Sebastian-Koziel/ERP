import { User } from "../../administration/users/Interfaces/user.interface";

export interface LoginResponse {
    user: User,
    access_token: string
}
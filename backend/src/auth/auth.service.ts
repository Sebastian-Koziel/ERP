import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { setAccessByRoles } from "src/users/Utils/setAccessByRole";


@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async register(login: string, password: string){
        // see if email is in use
        const users = await this.usersService.find(login);
        if(users.length){
            throw new BadRequestException('login in use');
        }
        //hash the users password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save it  TODO - change for proper create user
        const data:any= {
            login:login, 
            password: hashedPassword,
            
        }
        const newUser = await this.usersService.create(data)
        //return the user
        return newUser;
    }

    async logIn(login: string, password: string){
        const [user] = await this.usersService.find(login);
        if(!user){
            throw new NotFoundException('user not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new BadRequestException('wrong user or password');
        }

        const payload = {username: user.login, sub: user._id};
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: user
        };
    }

    async registerEmployee(userData:CreateUserDto){
        // see if login is in use
        const users = await this.usersService.find(userData.login);
        if(users.length){
            throw new BadRequestException('login in use');
        }
        //hash the users password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        //set standard access by role
        const accessByRole = setAccessByRoles(userData.role);

        //create a new user and save it  TDO - change for proper create user
        const data:CreateUserDto= {
            login: userData.login, 
            password: hashedPassword,
            name: userData.name,
            surname: userData.surname,
            role: userData.role,
            access: accessByRole        
        }
        const newUser = await this.usersService.create(data)
        //return the user
        return newUser;
    }
}
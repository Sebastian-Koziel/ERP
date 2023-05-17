import { Injectable, Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./interfaces/user.interface"

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    create(createUserDto: CreateUserDto): Promise<User>{
        const createdUser = this.userModel.create(createUserDto)
        return createdUser;
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async find(login: string): Promise<User[]> {
        return this.userModel.find({ login });
      }

    async remove(id: string){
        const filter = {_id : id}
        return this.userModel.deleteOne(filter);
      }
}

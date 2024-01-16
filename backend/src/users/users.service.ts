import { Injectable, Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./interfaces/user.interface"

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }

    async create(createUserDto: CreateUserDto): Promise<any>{
        const createdUser = await this.userModel.create(createUserDto)
        return createdUser._id;
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id);
    }
    //finding with no password
    async findOneNoPass(id: string): Promise<User> {
        return this.userModel.findById(id, '-password');
    }

    async find(login: string): Promise<User[]> {
        return this.userModel.find({ login });
      }


    async remove(id: string){
        const filter = {_id : id}
        return this.userModel.deleteOne(filter);
      }
    async update(id: string, attrs: Partial<User>){
        let user = await this.findOne(id);
        if(!user){
            throw new Error(`UPDATE - no user by this number`)
        }
        Object.assign(user, attrs);
        return user.save();
    }
}

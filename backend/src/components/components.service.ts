import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Component } from './interfaces/components.interface';
import { CreateComponentDto } from './dtos/create-component-dtos';





@Injectable()
export class ComponentsService {
    constructor(@Inject('COMPONENTS_MODEL') private componentModel: Model<Component>){}

    async findAll(): Promise<Component[]> {
        return this.componentModel.find().exec();
    }

    create(createProductDto: CreateComponentDto): Promise<Component>{
        const createdProduct = this.componentModel.create(createProductDto)
        return createdProduct;
    }

    async findOne(id:string): Promise<Component>{
        return this.componentModel.findById(id);
    }

    async remove(id:string){
        const filter = {_id : id}
        return this.componentModel.deleteOne(filter);
    }

}
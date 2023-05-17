import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dtos/create-operation.dtos';
import { Operation } from './interfaces/operation.interface';

@Injectable()
export class OperationsService {
    constructor(@Inject('OPERATION_MODEL') private operationModel: Model<Operation>){}

    async findAll(): Promise<Operation[]> {
        return this.operationModel.find().exec();
    }

    create(CreateOperationDto: CreateOperationDto): Promise<Operation>{
        const createdOperation = this.operationModel.create(CreateOperationDto)
        return createdOperation;
    }

    async findOne(id:string): Promise<Operation>{
        return this.operationModel.findById(id);
    }

    async remove(id:string){
        const filter = {_id : id}
        return this.operationModel.deleteOne(filter);
    }

}

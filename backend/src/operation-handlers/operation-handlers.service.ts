import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { OperationHandler } from './interfaces/operation-handler.interface';
import { CreateOperationHandlerDto } from 'src/operation-handlers/dtos/createOperationHandler.dtos';
import { Product } from 'src/products/interfaces/product.interface';

@Injectable()
export class OperationHandlersService {
    constructor(@Inject('OPERATIONHANDLER_MODEL') private operationHandler: Model<OperationHandler>){}

    async findAll(): Promise<OperationHandler[]> {
        return this.operationHandler.find().exec();
    }

    async findAllByStageId(stageId: string): Promise<OperationHandler[]> {
        return this.operationHandler.find({ stage_id: stageId }).exec();
      }

    async create(createOperationHandlerDto: CreateOperationHandlerDto): Promise<OperationHandler>{
        
        const createdOperationHandler = await this.operationHandler.create(createOperationHandlerDto)
        return createdOperationHandler;
    }

    async findOne(id:String): Promise<OperationHandler>{
        return await this.operationHandler.findById(id);
    }

    //do wymiany na update ponizej
    async findOneAndChangeNextOp(id:string, nextOperationHandler_id: string): Promise<OperationHandler>{
        let op = await this.operationHandler.findById(id);
        op.nextOperation_id = nextOperationHandler_id;
        await op.save();
        return op;
    }
    async update(id: string, attrs: Partial<OperationHandler>){
        let operationHandler = await this.operationHandler.findById(id);
        if(!operationHandler){
            throw new Error(`UPDATE - no operation handler by this number`)
        }
        Object.assign(operationHandler, attrs);
        return operationHandler.save();
    }
}

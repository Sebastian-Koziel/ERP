import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { OperationHandler } from './interfaces/operationHandler.interface';
import { CreateOperationHandlerDto } from 'src/operation-handlers/dtos/createOperationHandler.dtos';

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

    async findMany(ids: string[]): Promise<OperationHandler[]> {
        return await this.operationHandler.find({'_id': { $in: ids}})
    }

    //do wymiany na update ponizej
    async findOneAndChangeNextOp(parentOperationHandler_id:string, currentOperationHandler_id: string): Promise<OperationHandler>{
        let op = await this.operationHandler.findById(parentOperationHandler_id);
        op.childrenOperationHandlers.push(currentOperationHandler_id.toString());
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

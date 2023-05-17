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

    //creates a tree of operation handlers for given product
    async createTreeForProduct(product:Product, orderId:string){
        //keep record of last op to set relationships
        let previousOperationHandler_id: string | null = null;
        //for each operation
        for(let i=0;i<product.operations.length;i++){
            //create new operation for production
            let OperationHandler = new CreateOperationHandlerDto ;
            OperationHandler.name = product.operations[i].name;
            OperationHandler.order_id = orderId;
            OperationHandler.product_id = product._id;
    
            //set qty - TO DO - think over - czasami będzie w mb, m2, szt
            OperationHandler.qty = product.qty;
            //find best workSpace TO DO (future)
            OperationHandler.stage_id = product.operations[i].stage_id;
            OperationHandler.workSpace_id = product.operations[i].workSpace_type;
    
            //set relationships
            if(previousOperationHandler_id === null){
                //if operation is first
                OperationHandler.previousOperation_id = 'root';
                //set it ready to be done
                OperationHandler.avaiable = true;
                //add operation handler to DB to get its ID
                const savedOperationHandler = await this.operationHandler.create(OperationHandler);
                //set last operation handler id
                previousOperationHandler_id = savedOperationHandler._id;
                
            }
            else{
                //if its not first, set previous op id
                OperationHandler.previousOperation_id = previousOperationHandler_id;
                //save this one and get its id
                const savedOperationHandlerId = await this.create(OperationHandler);
                //go into previousOperationHandler and set nextop there to this id TO DO - change to update
                const previousOperationHandler = await this.findOneAndChangeNextOp(previousOperationHandler_id, savedOperationHandlerId._id);
                //set previousOperationHandler_id to this id
                previousOperationHandler_id = savedOperationHandlerId._id;
            }
        }
    }
}

import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "../operation-handlers.service";
import { Product } from "src/products/interfaces/product.interface";
import { CreateOperationHandlerDto } from "../dtos/createOperationHandler.dtos";
import { OperationHandler } from "../interfaces/operation-handler.interface";
import { UpdateOperationHandlerDto } from "../dtos/updateOperationHandler.dtos";



@Injectable()
export class ProductionGraphService {
constructor(
    private readonly OperationHandlersService: OperationHandlersService,
    ){}


async createGraphForProduct(product:Product, orderId:string){
    console.log('jestem w module graph')
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
            const savedOperationHandler = await this.OperationHandlersService.create(OperationHandler);
            //set last operation handler id
            previousOperationHandler_id = savedOperationHandler._id;
            
        }
        else{
            //if its not first, set previous op id
            OperationHandler.previousOperation_id = previousOperationHandler_id;
            //save this one and get its id
            const savedOperationHandlerId = await this.OperationHandlersService.create(OperationHandler);
            //go into previousOperationHandler and set next op there to this id TO DO - change to update
            const previousOperationHandler = await this.OperationHandlersService.findOneAndChangeNextOp(previousOperationHandler_id, savedOperationHandlerId._id);
            //set previousOperationHandler_id to this id
            previousOperationHandler_id = savedOperationHandlerId._id;
        }
    }
}
async changeQtyInBranch(startingOperationHanlder:OperationHandler, qty:number){
    let nodesToBeChanged = [];

    nodesToBeChanged.push(startingOperationHanlder);

    while(nodesToBeChanged){
        let currentNode = nodesToBeChanged.pop();
        
    }
}


async splitBranchForProduct(operationHandler:OperationHandler, qtyDone: number){
    //first deal with starting operation
    let attrs = new UpdateOperationHandlerDto;
        attrs.qtyDone += qtyDone;
        //update history TO DO
        this.OperationHandlersService.update(operationHandler._id, attrs);
    
    let operationHandlerToBeSplitted = null;

    //if its not the last op
    if(operationHandler.nextOperation_id){   
    operationHandlerToBeSplitted = await this.OperationHandlersService.findOne(operationHandler.nextOperation_id);
    }
    //variable to help with setting avaible on first copy
    let firstCopy = true;
    let idOfNewParent = null;

    while(operationHandlerToBeSplitted){
        //create a copy of operation handler
        let newOperationHandler = JSON.parse(JSON.stringify(operationHandlerToBeSplitted));
        //set new values
        newOperationHandler.qty = qtyDone;
        newOperationHandler.nextOperation_id = '';

        if(firstCopy){
            newOperationHandler.avaiable = true;
            firstCopy = false;
        }
        //if there is no newly created parent set old branch
        if(!idOfNewParent){
            newOperationHandler.previousOperation_id = operationHandlerToBeSplitted.previousOperation_id;
        }
        else{
            newOperationHandler.previousOperation_id = idOfNewParent;
        }
        //create operationhandler
        const savedOperationHandlerId = await this.OperationHandlersService.create(newOperationHandler);
        //set new parent id
        idOfNewParent = savedOperationHandlerId._id;
        }
        //if there is next step
        if(operationHandlerToBeSplitted.nextOperation_id !== ''){
            operationHandlerToBeSplitted = await this.OperationHandlersService.findOne(operationHandlerToBeSplitted.nextOperation_id);
        }
}


async moveUpOnTheSameBranch(currentOperationHandler:OperationHandler){
    //check if operation ready to be done
    if(!currentOperationHandler.avaiable){
        throw new Error(`JOBDONE - operation with this id is not ready to be done`);
    }
    let attrs = new UpdateOperationHandlerDto;
    attrs.avaiable = false;
    attrs.doneAt = new Date().getTime();
    this.OperationHandlersService.update(currentOperationHandler._id, attrs);

    //if there is next op
    if(currentOperationHandler.nextOperation_id){
    attrs = new UpdateOperationHandlerDto;
    attrs.avaiable = true;
    this.OperationHandlersService.update(currentOperationHandler.nextOperation_id, attrs);
    }
    else{
        //product finished TO DO
    }
}

//function thats is starting job closing and decide the logic
    registerJobDoneRoot(operationHandler: OperationHandler, qtySubmitted: number){
        //double check if submitted qty is ok
        if(qtySubmitted > 0 && (operationHandler.qty-operationHandler.qtyDone) >= qtySubmitted){
        //check if the whole operation was done
        if((operationHandler.qty-operationHandler.qtyDone) === qtySubmitted){
            this.moveUpOnTheSameBranch(operationHandler);
        }
        else{
            this.splitBranchForProduct(operationHandler, qtySubmitted);
        }
        }else{
            //throw error incorrect qty TO DO
        }
    }

}
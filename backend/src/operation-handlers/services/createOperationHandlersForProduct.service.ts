import { Injectable } from "@nestjs/common/decorators";
import { Operation } from "src/operations/interfaces/operation.interface";
import { OperationHandlersService } from "../operation-handlers.service";
import { CreateOperationHandlerDto } from "../dtos/createOperationHandler.dtos";
import { OperationsService } from "src/operations/operations.service";
import { Order } from "src/orders/interfaces/order.interface";


//** Service takes a product and parent id **/
//** creates operation handlers with relations and add them to DB **/


@Injectable()
export class createOperationHandlersForProductService {
constructor(
    private OperationHandlersService: OperationHandlersService,
    private operationService: OperationsService
    ){}

    async createOperationsTreeForProduct(product, parentId:string, orderToStart:Order){
        console.log(`creating operation handlers`)
        let createdOperationHandlers = []
        //add children array to each operation
        product.operations = this.addChildrenArrayToEachOperation(product.operations);
        //find last operation
        const finalOperation = product.operations.find((o) => o.parent_id === '');
        //setup operation pool and push last operation
        let opPool = [];
        opPool.push({op:finalOperation, parentOH_id: parentId});
    
        while(opPool.length > 0){
            let currentNode = opPool.pop();
            //opration to be done
            let operation = currentNode.op;
            //id of parent operation handler
            let parentOH_id = currentNode.parentOH_id;
            //create and add to DB new operation handler with basic data
            const newOperationHandler:any = await this.createNewOperationHandler(operation, orderToStart._id,'orderLine_id', parentOH_id, product.qty);
            createdOperationHandlers.push(newOperationHandler._id.toString());
             //if it there is a parent to the current operation handler
            if(parentOH_id !== ''){
            //add this operation handler ID to parent previousOperations array
                await this.findOperationHandlerAndAddThisAsChild(parentOH_id, newOperationHandler._id)   
            }
            //if operation has children
            if(operation.children.length > 0){
                operation.children.forEach(child_id => {
                    const child = product.operations.find((o) => o._id === child_id);
                    //add child to the pool
                    opPool.push({op:child, parentOH_id: newOperationHandler._id })
                });
            }
            }
      return createdOperationHandlers;
    }
    
    //building relations between operartion - adding children array into each operation
    addChildrenArrayToEachOperation = (operations) => {
        const operationsWithChildren = operations.map(op => ({ ...op, children: [] }));
    
    // create a map for quick access to the operation by its _id.
    const operationMap = new Map(operationsWithChildren.map(op => [op._id, op]));
    
    // populate the children arrays.
    operationsWithChildren.forEach(op => {
        // If the operation has a parent_id, find the parent and add this operation to its children array.
        if (op.parent_id) {
            const parentOp:any = operationMap.get(op.parent_id);
            if (parentOp) {
                parentOp.children.push(op._id);
            }
        }
    });
    return operationsWithChildren;
    }
    
    //update child list in operation handler
    findOperationHandlerAndAddThisAsChild = async (parentOperationHandler_id: string, currentOperationHandler_id: string) => {
        return await this.OperationHandlersService.findOneAndChangeNextOp(parentOperationHandler_id, currentOperationHandler_id);
    }
    
    //adds new operation handler to DB
    createNewOperationHandler = async (operation, order_id: string, orderLine_id: string, parentOH_id: string, qty: number) => {
        const baseOperation: Operation = await this.operationService.findOne(operation.operation_id);
    
        const newOperationHandler = new CreateOperationHandlerDto;
        newOperationHandler.orderLine_id = orderLine_id;
        newOperationHandler.order_id = order_id;
        newOperationHandler.name = operation.name;
        newOperationHandler.totalQty = qty;
        newOperationHandler.parentOperationHandler_id = parentOH_id;
        newOperationHandler.timePerPiece = baseOperation.timePerPiece;
        newOperationHandler.workspaceType_id = baseOperation.workSpaceTypeId
    
        //if there are no children - first step - make it avaiable for production
        if(operation.children.length <= 0){
          newOperationHandler.avaiableQty = qty;
          newOperationHandler.root = true;
        }
    
        const savedOperationHandler = await this.OperationHandlersService.create(newOperationHandler);
        return savedOperationHandler;
    }
    
    
}










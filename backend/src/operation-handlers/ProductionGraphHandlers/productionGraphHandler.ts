import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "../operation-handlers.service";
import { CreateOperationHandlerDto } from "../dtos/createOperationHandler.dtos";
import { ProductsService } from "src/products/products.service";
import { OperationsService } from "src/operations/operations.service";
import { Operation } from "src/operations/interfaces/operation.interface";




@Injectable()
export class ProductionGraphService {
constructor(
    private OperationHandlersService: OperationHandlersService,
    private productService: ProductsService,
    private operationService: OperationsService
    ){}

addProductsToProduction = async (orderLines) => {
    // Extract product IDs from the order
  const productIds = orderLines.map(p => p.productId);
  
    // Retrieve product details
  const productsDetails = await this.productService.findMany(productIds);

    // Combine products with their quantities
  const productsToAdd = productsDetails.map(product => {
    const orderProduct = orderLines.find(p => p.productId === product._id.toString());
    return {
      ...product.toJSON(), 
      qty: orderProduct?.qty || 0,
    };
  });

  productsToAdd.forEach(product => {
    this.createOperationsTreeForProduct(product, '')
  });

    return {
        statusCode: 200,
        message: 'Products were successfully added to production.',
      };
}

async createOperationsTreeForProduct(product, parentId:string){
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
        const newOperationHandler:any = await this.createNewOperationHandler(operation, 'order_id','orderLine_id', parentOH_id, product.qty);
         //if it there is a parent to the current operation handler
        if(parentOH_id !== ''){
        //add this operation handler ID to parent previousOperations array
            this.findOperationHandlerAndAddThisAsChild(parentOH_id, newOperationHandler._id)   
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



export const getObjectById = (array: any[], id: any) => {
  return array.find(item => item._id === id);
}

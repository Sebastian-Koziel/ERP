import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "../operation-handlers.service";
import { finishOperationHandlerData } from "../dtos/finishOperationHandler.dtos";
import { OperationHandler } from "../interfaces/operationHandler.interface";


//** closes jobs to be done **/



@Injectable()
export class finishOperationHandlerService {
constructor(
    private OperationHandlersService: OperationHandlersService,
    ){}

    async finishOperation(attr: finishOperationHandlerData){
        console.log(`gonna finis: ${attr.id}`);
        const operationHandler: OperationHandler = await this.OperationHandlersService.findOne(attr.id);
        //check if qty is right
        if(attr.qty > operationHandler.avaiableQty){
            throw new Error('Quantity to close seems to be larger than available quantity.');
        }
        //check if closing full
        if(attr.qty === operationHandler.avaiableQty){
            //set data in current OH
            const data = {
                avaiableQty: 0,
                finishedAt: attr.time
            }
            await this.OperationHandlersService.update(operationHandler._id, data)
            //check if there is next step
            if(operationHandler.parentOperationHandler_id !== ''){
                //if there is - set it to avaiable
                await this.changeOperationHandlerToAvaiable(operationHandler.parentOperationHandler_id, attr.qty)
            }
            else {
                //if not - close the whole order
                console.log(`gonna close this order`);
            }    
        }
        else{
            console.log(`partial closure - we gonna have fun`);
        }
        
        return {
        statusCode: 200,
        message: 'Job has been successfuly closed.',
        }
    }

    async changeOperationHandlerToAvaiable(id, qty){
        const attr: Partial<OperationHandler> = {
            avaiableQty:qty
        }
        await this.OperationHandlersService.update(id, attr)
    }
}


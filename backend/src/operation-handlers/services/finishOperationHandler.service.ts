import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "../operation-handlers.service";
import { finishOperationHandlerData } from "../dtos/finishOperationHandler.dtos";


//** Service takes a product and parent id **/
//** creates operation handlers with relations and add them to DB **/


@Injectable()
export class finishOperationHandlerService {
constructor(
    private OperationHandlersService: OperationHandlersService,
    ){}

    async finishOperation(attr: finishOperationHandlerData){
        console.log(`gonna finis: ${attr.id}`);

        //get operation handler
        //check if closing full
        //check if there is next step



        return {
        statusCode: 200,
        message: 'Job has been successfuly closed.',
        }
    }
}


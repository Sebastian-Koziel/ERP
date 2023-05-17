import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OperationHandlersService } from './operation-handlers.service';
import { CreateOperationHandlerDto } from 'src/operation-handlers/dtos/createOperationHandler.dtos';
import { RegisterJobDoneDto } from './dtos/registerJobDone.dtos';
import { UpdateOperationHandlerDto } from './dtos/updateOperationHandler.dtos';
import { OperationHandler } from './interfaces/operation-handler.interface';
import { Product } from 'src/products/interfaces/product.interface';

 

@Controller('operation-handlers')
export class OperationHandlersController {
constructor(
    private operationHandlerService: OperationHandlersService
){}
@UseGuards(AuthGuard)
@Post('add')
    async createNewOrder(@Body() body: CreateOperationHandlerDto){
        return await this.operationHandlerService.create(body);
        
    }

@UseGuards(AuthGuard)
@Post('jobdone')
    async RegisterJobDone(@Body() body: RegisterJobDoneDto){
        let operationHandler = await this.operationHandlerService.findOne(body.operationHandler_id); 
        //if qty done is the same as in handler qty just move status in branch - for now always
        this.moveDownOnTheSameBranch(operationHandler);
        //if qty is lesser - create new branch and modify current - TO BE DONE

        //if qty is bigger - modify/delete branches and create new one - TO BE DONE - need to change from handler id to ids    
    }

    moveDownOnTheSameBranch(currentOperationHandler:OperationHandler){
        //check if operation ready to be done
        if(!currentOperationHandler.avaiable){
            throw new Error(`JOBDONE - operation with this id is not ready to be done`);
        }
        let attrs = new UpdateOperationHandlerDto;
        attrs.avaiable = false;
        attrs.doneAt = new Date().getTime();
        this.operationHandlerService.update(currentOperationHandler._id, attrs);

        //if there is next op
        if(currentOperationHandler.nextOperation_id){
        attrs = new UpdateOperationHandlerDto;
        attrs.avaiable = true;
        this.operationHandlerService.update(currentOperationHandler.nextOperation_id, attrs);
        }
        else{
            //product finished TO DO
        }

    }


}

 
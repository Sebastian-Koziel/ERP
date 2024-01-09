import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OperationHandlersService } from './operation-handlers.service';
import { CreateOperationHandlerDto } from 'src/operation-handlers/dtos/createOperationHandler.dtos';
import { RegisterJobDoneDto } from './dtos/registerJobDone.dtos';
import { OperationHandler } from './interfaces/operation-handler.interface';
import { ProductionGraphService } from './ProductionGraphHandlers/productionGraphHandler';


 

@Controller('operation-handlers')
export class OperationHandlersController {
constructor(
    private operationHandlerService: OperationHandlersService,
    private productionGraphHandler: ProductionGraphService
){}

@UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<OperationHandler[]> {
        return this.operationHandlerService.findAll();
    }
@UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<OperationHandler>{
        console.log(`operationhandler `)
        return this.operationHandlerService.findOne(id);
    }
@UseGuards(AuthGuard)
    @Get('byStage/:id')
    async findAllByStageId(@Param('id') id:string) {
        return this.operationHandlerService.findAllByStageId(id);    
    }
@UseGuards(AuthGuard)
@Post('add')
    async createNewOrder(@Body() body: CreateOperationHandlerDto){
        return await this.operationHandlerService.create(body);
        
    }
@UseGuards(AuthGuard)
@Post('jobdone')
    async RegisterJobDone(@Body() body: RegisterJobDoneDto){
        console.log(`trying to close job: ${body.operationHandler_id}`)
        let operationHandler = await this.operationHandlerService.findOne(body.operationHandler_id); 
        //if qty done is the same as in handler qty just move status in branch - for now always
        this.productionGraphHandler.moveUpOnTheSameBranch(operationHandler);            
    }
}

 
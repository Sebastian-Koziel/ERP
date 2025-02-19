import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OperationHandlersService } from './operation-handlers.service';
import { CreateOperationHandlerDto } from 'src/operation-handlers/dtos/createOperationHandler.dtos';
import { OperationHandler } from './interfaces/operationHandler.interface';
import { UpdateOperationHandlerData } from './dtos/updateOperationHandler.dtos';
import { finishOperationHandlerData } from './dtos/finishOperationHandler.dtos';
import { finishOperationHandlerService } from './services/finishOperationHandler.service';


@Controller('operation-handlers')
export class OperationHandlersController {
constructor(
    private operationHandlerService: OperationHandlersService,
    private finishOperationService: finishOperationHandlerService
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
@Post('update')
updateOperationHandler(@Body() body: UpdateOperationHandlerData) {
        return this.operationHandlerService.update(body.id, body.attr);
    }

@UseGuards(AuthGuard)
@Post('finish')
finishOperationHandler(@Body() body: finishOperationHandlerData) {
        return this.finishOperationService.finishOperation(body);
    }
}

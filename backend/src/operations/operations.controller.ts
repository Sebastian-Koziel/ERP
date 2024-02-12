import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { Access } from '../auth/access.enum';
import { CreateOperationDto } from './dtos/create-operation.dtos';
import { OperationsService } from './operations.service';
import { Operation } from './interfaces/operation.interface';
import { UpdateOperationData } from './interfaces/updateOperation.interface';


@Controller('operations')
export class OperationsController {
    constructor(
        private operationService: OperationsService
    ){}

    //create
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    createUser(@Body() body: CreateOperationDto) {
        this.operationService.create(body)
    }
    //find all
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<Operation[]> {
        return this.operationService.findAll();
    }

    //find one by id
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Operation>{
        return this.operationService.findOne(id);
    }

    //update
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('update')
    updateUser(@Body() body: UpdateOperationData) {
        return this.operationService.update(body.id, body.attr);
    }

    //remove
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.operationService.remove(id);
    }
    
}

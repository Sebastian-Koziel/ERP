import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { Access } from '../auth/access.enum';
import { CreateOperationDto } from './dtos/create-operation.dtos';
import { OperationsService } from './operations.service';
import { Operation } from './interfaces/operation.interface';


@Controller('operations')
export class OperationsController {
    constructor(
        private operationService: OperationsService
    ){}


    @UseGuards(AuthGuard)
    @Post('create')
    createUser(@Body() body: CreateOperationDto) {
        this.operationService.create(body)
    }


    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Operation[]> {
        return this.operationService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Operation>{
        return this.operationService.findOne(id);
    }

}

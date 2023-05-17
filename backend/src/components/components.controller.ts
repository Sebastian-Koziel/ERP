import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dtos/create-component-dtos';
import { Component } from './interfaces/components.interface';

@Controller('components')
export class ComponentsController {
    constructor(
        private componentsService: ComponentsService
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    createUser(@Body() body: CreateComponentDto) {
        this.componentsService.create(body)
    }


    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Component[]> {
        return this.componentsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Component>{
        return this.componentsService.findOne(id);
    }
}

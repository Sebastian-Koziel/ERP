import { Body, Controller, Post, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { CreateWorkspaceTypeDto } from './dtos/createWorkspaceType.dtos';
import { WorkspaceTypesService } from './workspace-types.service';
import { Access } from 'src/auth/access.enum';

import { WorkspaceType } from './interfaces/workspaceType.interface';


@Controller('workspace/types')
export class WorkspaceTypesController {
    constructor( private WorkspaceTypesService: WorkspaceTypesService){}

    //@Access_decorator(Access.admin_company_setup_can_modify)
    //@UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    async createWorkspace(@Body() body: CreateWorkspaceTypeDto) {
        return await this.WorkspaceTypesService.create(body);
    }

    //@Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<WorkspaceType[]> {
        return await this.WorkspaceTypesService.findAll();
    }

    //@Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<WorkspaceType>{
        return await this.WorkspaceTypesService.findOne(id);
    }

    //TO BE FIXED
    //@Access_decorator(Access.admin_company_setup_can_modify)
    //@UseGuards(AuthGuard, AccessGuard)
    @Put('/:id')
    async update(@Param('id') id: string, @Body() body: any) {
        return await this.WorkspaceTypesService.update(id, body);
    }

    //TO BE FIXED
    //@Access_decorator(Access.admin_company_setup_can_delete)
    //@UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        return await this.WorkspaceTypesService.remove(id);
    }
}

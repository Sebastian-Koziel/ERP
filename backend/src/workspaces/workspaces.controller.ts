import { Body, Controller, Post, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { CreateWorkspaceDto } from './dtos/createWorkspace.dtos';
import { WorkspacesService } from './workspaces.service';
import { Access } from 'src/auth/access.enum';
import { Workspace } from './interfaces/workspace.interface';
import { UpdateWorkspace } from './interfaces/updateWorkspace.interface';



@Controller('workspaces')
export class WorkspacesController {
    constructor( private workspacesService: WorkspacesService){}

    //@Access_decorator(Access.admin_company_setup_can_modify)
    //@UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    async createWorkspace(@Body() body: CreateWorkspaceDto) {
        return await this.workspacesService.create(body);
    }

    //@Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<Workspace[]> {
        return await this.workspacesService.findAll();
    }

   // @Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Workspace>{
        return await this.workspacesService.findOne(id);
    }

    //@Access_decorator(Access.companySetup)
    //@UseGuards(AuthGuard, AccessGuard)
    @Post('update')
    updateUser(@Body() body: UpdateWorkspace) {
        console.log(`controler`)
        return this.workspacesService.update(body.id, body.attr);
    }

    //@Access_decorator(Access.admin_company_setup_can_delete)
    //@UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        return await this.workspacesService.remove(id);
    }
}
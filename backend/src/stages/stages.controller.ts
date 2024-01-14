import { Body, Controller, Post, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { Access } from 'src/auth/access.enum';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dtos/createStage.dtos';
import { Stage } from './interfaces/stage.interface';
import { UpdateStage } from './interfaces/updateStage.interface';



@Controller('stages')
export class StagesController {
    constructor(
        private stagesService: StagesService
    ){}

    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    async createWorkspace(@Body() body: CreateStageDto) {
        return await this.stagesService.create(body);
    }

    //@Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<Stage[]> {
        return await this.stagesService.findAll();
    }

    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Stage>{
        return await this.stagesService.findOne(id);
    }

    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('update')
    updateUser(@Body() body: UpdateStage) {
        return this.stagesService.update(body.id, body.attr);
    }

    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        return await this.stagesService.remove(id);
    }

}

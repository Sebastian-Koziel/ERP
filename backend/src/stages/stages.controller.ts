import { Body, Controller, Post, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGuard } from '../auth/access.guard';
import { Access_decorator } from '../auth/access.decorator';
import { Access } from 'src/auth/access.enum';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dtos/createStage.dtos';
import { Stage } from './interfaces/stage.interface';
import { UpdateStageDto } from './dtos/updateStage.dtos';


@Controller('stages')
export class StagesController {
    constructor(
        private stagesService: StagesService
    ){}

    //@Access_decorator(Access.admin_company_setup_can_modify)
    //@UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    async createWorkspace(@Body() body: CreateStageDto) {
        return await this.stagesService.create(body);
    }

    //@Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<Stage[]> {
        return await this.stagesService.findAll();
    }

    //@Access_decorator(Access.admin_company_setup_can_read)
    //@UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Stage>{
        return await this.stagesService.findOne(id);
    }

   // @Access_decorator(Access.admin_company_setup_can_modify)
    //@UseGuards(AuthGuard, AccessGuard)
    @Put('/:id')
    async update(@Param('id') id: string, @Body() body: UpdateStageDto) {
        return await this.stagesService.update(id, body);
    }

    //@Access_decorator(Access.admin_company_setup_can_delete)
    @UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        return await this.stagesService.remove(id);
    }

}

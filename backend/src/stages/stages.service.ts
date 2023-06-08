import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stage } from './interfaces/stage.interface';
import { CreateStageDto } from './dtos/createStage.dtos';


@Injectable()
export class StagesService {
    constructor(@Inject(`STAGE_MODEL`) private stageModel: Model<Stage>){}

//get all
    async findAll(): Promise<Stage[]> {
        return await this.stageModel.find();
    }

//get one by ID
    async findOne(id: string): Promise<Stage> {
        return await this.stageModel.findById(id);
    }

//create
    async create(createWorkspaceDto: CreateStageDto): Promise<Stage>{
    const createdWorkspace = await this.stageModel.create(createWorkspaceDto)
    return createdWorkspace;
    }

//update
    async update(id: string, attrs: Partial<Stage>){
        let stageForChange = await this.stageModel.findById(id);
        if(!stageForChange){
            throw new Error(`UPDATE - no workspace with this number`)
        }
        Object.assign(stageForChange, attrs);
        return stageForChange.save();
    }

//delete
    async remove(id: string){
        const filter = {_id : id}
        return await this.stageModel.deleteOne(filter);
    }


}

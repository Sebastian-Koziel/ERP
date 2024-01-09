import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WorkspaceType } from './interfaces/workspaceType.interface';
import { CreateWorkspaceTypeDto } from './dtos/createWorkspaceType.dtos';

@Injectable()
export class WorkspaceTypesService {
    constructor(@Inject(`WORKSPACETYPE_MODEL`) private workspaceTypeModel: Model<WorkspaceType>){}

//get all
    async findAll(): Promise<WorkspaceType[]> {
        return await this.workspaceTypeModel.find();
    }

//get one by ID
    async findOne(id: string): Promise<WorkspaceType> {
        return await this.workspaceTypeModel.findById(id);
    }

//create
    async create(createWorkspaceDto: CreateWorkspaceTypeDto): Promise<WorkspaceType>{
    const createdWorkspace = await this.workspaceTypeModel.create(createWorkspaceDto)
    return createdWorkspace;
    }

//update
    async update(id: string, attrs: Partial<WorkspaceType>){
        let workSpaceForChange = await this.workspaceTypeModel.findById(id);
        if(!workSpaceForChange){
            throw new Error(`UPDATE - no workspacetype with this number`)
        }
        Object.assign(workSpaceForChange, attrs);
        return workSpaceForChange.save();
    }

//delete
    async remove(id: string){
        const filter = {_id : id}
        return await this.workspaceTypeModel.deleteOne(filter);
    }


}


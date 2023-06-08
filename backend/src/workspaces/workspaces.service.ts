import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Workspace } from './interfaces/workspace.interface';
import { CreateWorkspaceDto } from './dtos/createWorkspace.dtos';

@Injectable()
export class WorkspacesService {
    constructor(@Inject(`WORKSPACE_MODEL`) private workspaceModel: Model<Workspace>){}

//get all
    async findAll(): Promise<Workspace[]> {
        return await this.workspaceModel.find();
    }

//get one by ID
    async findOne(id: string): Promise<Workspace> {
        return await this.workspaceModel.findById(id);
    }

//create
    async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace>{
    const createdWorkspace = await this.workspaceModel.create(createWorkspaceDto)
    return createdWorkspace;
    }

//update
    async update(id: string, attrs: Partial<Workspace>){
        let workSpaceForChange = await this.workspaceModel.findById(id);
        if(!workSpaceForChange){
            throw new Error(`UPDATE - no workspace with this number`)
        }
        Object.assign(workSpaceForChange, attrs);
        return workSpaceForChange.save();
    }

//delete
    async remove(id: string){
        const filter = {_id : id}
        return await this.workspaceModel.deleteOne(filter);
    }


}

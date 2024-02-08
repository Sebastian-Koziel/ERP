import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "src/operation-handlers/operation-handlers.service";
import { WorkspacesService } from "src/workspaces/workspaces.service";





@Injectable()
export class PlanningHandler {
constructor(
    private operationHandlersService: OperationHandlersService,
    private workSpacesService: WorkspacesService
    ){}

generatePlan = async () => {
    const allOperationHandlers = await this.operationHandlersService.findAll();
    const allWorkSpaces = await this.workSpacesService.findAll();

    //find all roots and push to pool
    let operationHandlersPool = []
    //pick the one with highest priority
    //double check if previous operation(s) is calculated
    //pick the fastest avaiable workspace from workspacetype
    //find the quickes time it can start
    //calculate time
    //push its children to the pool

}

findAvaiableWorkSpaceType = () => {

}
}










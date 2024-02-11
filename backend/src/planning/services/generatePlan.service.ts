import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "src/operation-handlers/operation-handlers.service";
import { WorkspacesService } from "src/workspaces/workspaces.service";

//** Service takes all operation handlers and distribute them for workspaces by priority **/
//** Workspaces are picked by which is avaiable first                                    **/
//** Operation handlers with the same priority are picked randomly                       **/
//** Starting times are calculated based on all children availabity                      **/



@Injectable()
export class GenerateProductionPlan {
constructor(
    
    
    ){}

generatePlan = async () => {
    //const allOperationHandlers = await this.operationHandlersService.findAll();
    //const allWorkSpaces = await this.workSpacesService.findAll();

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










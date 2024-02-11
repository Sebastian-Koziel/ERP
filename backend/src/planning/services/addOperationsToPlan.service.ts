import { Injectable } from "@nestjs/common/decorators";
import { OperationHandler } from "src/operation-handlers/interfaces/operationHandler.interface";
import { OperationHandlersService } from "src/operation-handlers/operation-handlers.service";
import { Workspace } from "src/workspaces/interfaces/workspace.interface";
import { WorkspacesService } from "src/workspaces/workspaces.service";


//** Service takes operation handlers and put them at the end of plan **/
//** operations are added to the workspace of given type which will be avaible soonest**/


@Injectable()
export class AddOperationsToPlan {
constructor(
    private operationHandlersService: OperationHandlersService,
    private workspaceService: WorkspacesService,
    private workspaces: Workspace[],
    private operationHandlers: OperationHandler[]
    ){}

addOperationHandlersToPlan = async (operarationHandlersIds: string[]) => {
    //retrive Ohandlers
    this.operationHandlers = await this.operationHandlersService.findMany(operarationHandlersIds);
    //retrive workspaces state
    this.workspaces = await this.workspaceService.findAll();

    
    const allHandlersMap = new Map<string, OperationHandler>();
    this.operationHandlers.forEach(operation => allHandlersMap.set(operation._id, operation));

}

traverseOperations = (operationsHandlers: OperationHandler[], allHandlersMap: Map<string, OperationHandler>) => {
    operationsHandlers.forEach(operation => {
        if (operation.childrenOperationHandlers && operation.childrenOperationHandlers.length > 0) {
            const childrenHandlers = operation.childrenOperationHandlers.map(id => allHandlersMap.get(id)).filter(Boolean) as OperationHandler[];
            // If the operation has children, check their completion status
            const childrenCalculated = childrenHandlers.every(child => child.calculated);
            if (!childrenCalculated) {
                // If children are not completed, switch to them
                this.traverseOperations(childrenHandlers, allHandlersMap);
            }
            else{
                this.setUpTimesInOHandler(operation, childrenHandlers);
            }
        } else {
            // If it's a leaf operation, perform it
            this.setUpTimesInOHandler(operation, null);
        }
    });
}

setUpTimesInOHandler = (oHandler: OperationHandler, children: OperationHandler[] | null) => {
    let times: number[] = []
    //pick a workspace
    const bestWorkspace = this.findWorkspaceOfTypeAvaiableSoonest(this.workspaces, oHandler.workspaceType_id);
    times.push(bestWorkspace.avaiableForJobAt);
    //add times from children
    if(children){
        children.forEach(child => {
            times.push(child.plannedFinish);
        })
    }
    //find the soonest we can start
    let timeToStart: number = Math.max(...times);
    //calculate duration
    let duration: number = oHandler.timePerPiece * oHandler.totalQty; 
    //set times
    oHandler.plannedStart = timeToStart;
    oHandler.plannedFinish = timeToStart + duration;
    //change as calculated
    oHandler.calculated = true;

}


findWorkspaceOfTypeAvaiableSoonest = (workspaces: Workspace[], type: string) => {
    //get all of given type
    workspaces = workspaces.filter(obj => obj.workspaceType_id === type);
    const now = Date.now();
    //if avaiable null - set avaiable now
    workspaces.map(workspace => ({
        ...workspace,
        avaiableForJobAt: workspace.avaiableForJobAt === null ? now : workspace.avaiableForJobAt
    }));
    //sort
    workspaces.sort((a, b) => a.avaiableForJobAt - b.avaiableForJobAt);
    //return first
    return workspaces[0];
}

}










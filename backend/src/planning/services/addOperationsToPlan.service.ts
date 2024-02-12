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
    private workspaceService: WorkspacesService
    ){}

addOperationHandlersToPlan = async (operarationHandlersIds: string[]) => {
    console.log(`adding to the plan`)
    //retrive Ohandlers
    const allOperationHandlers: OperationHandler[] = JSON.parse(JSON.stringify(await this.operationHandlersService.findMany(operarationHandlersIds)));
    
    const operationHandlers: OperationHandler[] = allOperationHandlers.filter(obj => operarationHandlersIds.includes(obj._id));

    console.log(operationHandlers);    
    //retrive workspaces state
    const workspaces = await this.workspaceService.findAll();

    
    const allHandlersMap = new Map<string, OperationHandler>();
    operationHandlers.forEach(operation => allHandlersMap.set(operation._id, operation));

    this.traverseOperations(operationHandlers, allHandlersMap, workspaces);

    
    console.log(allOperationHandlers);

}

traverseOperations = (operationsHandlers: OperationHandler[], allHandlersMap: Map<string, OperationHandler>, workspaces:Workspace[]) => {
    operationsHandlers.forEach(operation => {
        console.log(`op: ${operation.name}`);
        if (operation.childrenOperationHandlers && operation.childrenOperationHandlers.length > 0) {
            const childrenHandlers = operation.childrenOperationHandlers.map(id => allHandlersMap.get(id)).filter(Boolean) as OperationHandler[];
            // If the operation has children, check their completion status
            const childrenCalculated = childrenHandlers.every(child => child.calculated);
            if (!childrenCalculated) {
                console.log(`kids but not calculated`)
                this.traverseOperations(childrenHandlers, allHandlersMap, workspaces);
            }
            else{
                this.setUpTimesInOHandler(operation, childrenHandlers, workspaces);
            }
        } else {
            console.log(`no kids`)
            this.setUpTimesInOHandler(operation, null, workspaces);
        }
    });
}

setUpTimesInOHandler = (oHandler: OperationHandler, children: OperationHandler[] | null, workspaces: Workspace[]) => {
    console.log(`working on: ${oHandler.name}`)
    let times: number[] = []
    //pick a workspace
    const bestWorkspace = this.findWorkspaceOfTypeAvaiableSoonest(workspaces, oHandler.workspaceType_id);
    times.push(bestWorkspace.avaiableForJobAt);
    //add times from children
    if(children){
        children.forEach(child => {
            times.push(child.plannedFinish);
        })
    }
    console.log(times)
    //find the soonest we can start
    let timeToStart: number = Math.max(...times);
    //calculate duration
    let duration: number = oHandler.timePerPiece * oHandler.totalQty; 
    //set times
    oHandler.plannedStart = timeToStart;
    oHandler.plannedFinish = timeToStart + duration;
    bestWorkspace.avaiableForJobAt = timeToStart + duration;
    //change as calculated
    oHandler.calculated = true;
    oHandler.workSpace_id = bestWorkspace._id;
    oHandler.stage_id = bestWorkspace._id;
}


findWorkspaceOfTypeAvaiableSoonest = (workspaces: Workspace[], type: string) => {
    //get all of given type
    workspaces = workspaces.filter(obj => obj.workspaceType_id === type);
    const now = Date.now();
    //if avaiable null - set avaiable now
    workspaces.forEach(workspace => {
        if (workspace.avaiableForJobAt === null) {
            workspace.avaiableForJobAt = now;
        }
    });
    //sort
    workspaces.sort((a, b) => a.avaiableForJobAt - b.avaiableForJobAt);
    //return first
    return workspaces[0];
}

}










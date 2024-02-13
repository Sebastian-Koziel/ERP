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
    
    
    //retrive workspaces state
    const workspaces = await this.workspaceService.findAll();

    
    const allHandlersMap = new Map<string, OperationHandler>();
    allOperationHandlers.forEach(operation => allHandlersMap.set(operation._id, operation));

    
    //find last operation handler
    const lastOHandler:OperationHandler = allOperationHandlers.find(obj => obj.parentOperationHandler_id === '');

    this.traverseOperations(lastOHandler, allHandlersMap, workspaces);

    //save operation handlers and workspaces
    for (const operation of allOperationHandlers) {
        let attr: Partial<OperationHandler> = {
            plannedStart: operation.plannedStart,
            plannedFinish: operation.plannedFinish,
            stage_id: operation.stage_id,
            workSpace_id: operation.workSpace_id
        };
        await this.operationHandlersService.update(operation._id, attr);
    }
    console.log(allOperationHandlers);

}

traverseOperations = (operationHandler: OperationHandler, allHandlersMap: Map<string, OperationHandler>, workspaces:Workspace[]) => {
    
    let pool: string[] = [];
    pool.push(operationHandler._id);

    let safety = 0
    while(pool.length > 0 && safety < 1000){
        let node:OperationHandler = allHandlersMap.get(pool[pool.length-1]);
        console.log(`working with: ${node.name}`)
        //check if node has children
        if(node.childrenOperationHandlers.length > 0){
            console.log(`has kids checking`)
            //check if children have been calculated
            let childrenCalculated: boolean = true;
            node.childrenOperationHandlers.forEach((childId)=>{
                const child: OperationHandler = allHandlersMap.get(childId);
                console.log(`child: ${child.name}`)
                //if child not calculated
                if(!child.calculated){
                    console.log(`not calculated added to pool`)
                    //add to the pool
                    pool.push(child._id);
                    childrenCalculated = false;
                }
            })
            //if all children calculated
            if(childrenCalculated){
                //set times and remove from pool
            this.setUpTimesInOHandler(node, workspaces, allHandlersMap);
            pool.pop();
            }
        }
        else{
            //if no children, calculate and remove from pool
            this.setUpTimesInOHandler(node, workspaces, allHandlersMap);
            pool.pop();
        }
        safety++
    }
}

setUpTimesInOHandler = (oHandler: OperationHandler, workspaces: Workspace[], allHandlersMap: Map<string, OperationHandler>) => {
    
    let times: number[] = []
    //pick a workspace
    const bestWorkspace = this.findWorkspaceOfTypeAvaiableSoonest(workspaces, oHandler.workspaceType_id);
    times.push(bestWorkspace.avaiableForJobAt);
    //add times from children
    if(oHandler.childrenOperationHandlers.length > 0){
        oHandler.childrenOperationHandlers.forEach((childId)=> {
            times.push(allHandlersMap.get(childId).plannedFinish);
        })
    }
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
        //if avaiable time is in past also return now
        if (workspace.avaiableForJobAt < now){
            workspace.avaiableForJobAt = now;
        }
    });
    //sort
    workspaces.sort((a, b) => a.avaiableForJobAt - b.avaiableForJobAt);
    //return first
    return workspaces[0];
}

}










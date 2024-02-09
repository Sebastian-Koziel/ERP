import { Injectable } from "@nestjs/common/decorators";
import { OperationHandlersService } from "src/operation-handlers/operation-handlers.service";
import { WorkspacesService } from "src/workspaces/workspaces.service";


//** Service takes operation handlers and put them at the end of plan **/
//** operations are added to the workspace of given type which will be avaible soonest**/


@Injectable()
export class AddOperationsToPlan {
constructor(
    private workspacesService = WorkspacesService
    ){}

addOperations = async () => {
    

}

}










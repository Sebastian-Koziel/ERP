import { Stage } from "../components/administration/productionStages/interfaces/Stage.interface";
import { Workspace } from "../components/administration/workspaces/Interfaces/Workspace.interface";
import { WorkspaceType } from "../components/administration/workspaceTypes/Interfaces/WorkspaceType";


export interface ResourceMap {
  stages: Stage[];
  workspaces: Workspace[];
  workspaceTypes: WorkspaceType[];
  // ... other resource keys and their types ...
}
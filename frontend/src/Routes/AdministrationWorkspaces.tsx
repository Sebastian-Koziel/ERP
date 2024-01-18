import WorkspaceListPage from "../components/administration/workspaces/ListPage/WorkSpacesListPage";
import WorkspaceRoot from "../components/administration/workspaces/Root/WorkSpacesRoot";
import AddNewWorkspace from "../components/administration/workspaces/new/AddNewWorkspace";
import { action as AddNewWorkspaceAction } from "../components/administration/workspaces/new/AddNewWorkspace";

import { newWorkspaceLoader } from "../components/administration/workspaces/new/AddNewWorkspace";

import WorkspaceTypesListPage, { workspaceTypesLoader } from "../components/administration/workspaces/Types/ListPage/ListPage";
import AddNewWorkspaceType, { action as addNewWorkspaceType} from "../components/administration/workspaces/Types/New/AddNewWorkspaceType";
import { fetchMultipleResources } from "../utils/fetchMultipleResources";
import SingleWorkspacePage from "../components/administration/workspaces/singleWorkspacePage/singleWorkspacePage";
import { singleWorkspaceLoader } from "../components/administration/workspaces/Utils/singleWorkspaceLoader";
 

const workspacesRoutes = {
    path: "workspaces",
    element: <WorkspaceRoot />,
    children: [
      {
        index: true,
        id: "workspace",
        element: <WorkspaceListPage />,
        loader: ()=>fetchMultipleResources(['workspaces', 'stages', 'workspaceTypes']),
      },
      {
        path: "new",
        element: <AddNewWorkspace />,
        action: AddNewWorkspaceAction,
        loader: newWorkspaceLoader
      },
      {
        path: ":workspaceId",
        id: "singleWorkspace",
        loader: singleWorkspaceLoader,
        children: [
          {
            path: "",
            element: <SingleWorkspacePage />,
          } 
        ],
      },
    ],
}

/* path: "workspaceTypes",
      id: "workspaceTypes",
      element: < WorkspaceTypesListPage />,
      loader: workspaceTypesLoader,
      children: [
        {
          path: "new",
              element: <AddNewWorkspaceType />,
              action: addNewWorkspaceType,
        }
      ] */
    
  
  
  export { workspacesRoutes };
import WorkspaceListPage from "../components/administration/workspaces/ListPage/WorkSpacesListPage";
import WorkspaceRoot from "../components/administration/workspaces/Root/WorkSpacesRoot";
import { fetchMultipleResources } from "../utils/fetchMultipleResources";
import SingleWorkspacePage from "../components/administration/workspaces/singleWorkspacePage/singleWorkspacePage";
import { singleWorkspaceLoader } from "../components/administration/workspaces/Utils/singleWorkspaceLoader";
import { addNewWorkspaceLoader } from "../components/administration/workspaces/Utils/addNewWorkspaceLoader";
import AddNewWorkspace from "../components/administration/workspaces/new/AddNewWorkspace";
 

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
        loader: addNewWorkspaceLoader
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
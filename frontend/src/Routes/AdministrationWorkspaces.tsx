import WorkspaceListPage, { workspacesLoader } from "../components/administration/workspaces/ListPage/WorkSpacesListPage";
import WorkspaceRoot from "../components/administration/workspaces/Root/WorkSpacesRoot";
import AddNewWorkspace from "../components/administration/workspaces/new/AddNewWorkspace";
import { action as AddNewWorkspaceAction } from "../components/administration/workspaces/new/AddNewWorkspace";

import { newWorkspaceLoader } from "../components/administration/workspaces/new/AddNewWorkspace";

import WorkspaceTypesListPage, { workspaceTypesLoader } from "../components/administration/workspaces/Types/ListPage/ListPage";
import AddNewWorkspaceType, { action as addNewWorkspaceType} from "../components/administration/workspaces/Types/New/AddNewWorkspaceType";
 

const workspacesRoutes = {
    path: "workspaces",
    element: <WorkspaceRoot />,
    children: [
      {
        index: true,
        id: "workspace",
        element: <WorkspaceListPage />,
        loader: workspacesLoader,
      },
      {
        path: "new",
        element: <AddNewWorkspace />,
        action: AddNewWorkspaceAction,
        loader: newWorkspaceLoader
      },
      {
        /* path: ":stageId",
        id: "stagesLoader",
        loader: singleStagesLoader,
        children: [
          {
            path: "",
            element: <SingleStagePage />,
          },
          {
            path: "edit",
            element: <EditStage />,
          },
        ], */
      },
      {
        path: "types",
        id: "workspaceTypes",
        element: < WorkspaceTypesListPage />,
        loader: workspaceTypesLoader,
      },
      {
        path: "types/new",
            element: <AddNewWorkspaceType />,
            action: addNewWorkspaceType,
      }
    ],
  };
  
  export { workspacesRoutes };
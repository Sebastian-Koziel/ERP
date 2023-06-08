import WorkspaceListPage, { workspacesLoader } from "../components/administration/workspaces/ListPage/WorkSpacesListPage";
import WorkspaceRoot from "../components/administration/workspaces/Root/WorkSpacesRoot";
import AddNewWorkspace from "../components/administration/workspaces/new/AddNewWorkspace";
import { action as AddNewWorkspaceAction } from "../components/administration/workspaces/new/AddNewWorkspace";

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
    ],
  };
  
  export { workspacesRoutes };
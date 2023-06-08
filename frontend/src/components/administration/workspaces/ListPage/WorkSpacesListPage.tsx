import { useRouteLoaderData } from "react-router-dom";
import { Workspace } from "../Interfaces/Workspace.interface";
import WorkspacesList from "../List/WorkspacesList";


function WorkspaceListPage() {
  const workspaces = useRouteLoaderData("workspace");

  return <WorkspacesList workspaces={workspaces} />;
}

export default WorkspaceListPage;



export const workspacesLoader = async (): Promise<Workspace[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/workspaces", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


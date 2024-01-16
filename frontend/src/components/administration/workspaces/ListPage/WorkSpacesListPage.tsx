import { useRouteLoaderData } from "react-router-dom";
import { checkForErrors, fetchMultipleResources } from "../../../../utils/fetchMultipleResources";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import DataTable from "../../../../utils/datatable";
import { getSafe } from "../../../../utils/getSafeForTS";

function WorkspaceListPage() {

  const routeData = useRouteLoaderData("workspace") as ReturnType<typeof fetchMultipleResources>;
  
  //pleasing TS
  const stages = getSafe(routeData, 'stages', []);
  const workspaceTypes = getSafe(routeData, 'workspaceTypes', []);
  const workspaces = getSafe(routeData, 'workspaces', []);

  //checking if we have any errors in routeData
  const errors = checkForErrors(routeData);

  //if so display error
  if (errors.length > 0) {
    return <FetchErrorComponent errors={errors} />;
  }
  
  //if there are no errors from fetch
  
  //setting up datatable
  const columnsSetup = [
    {header: "name", accessor: "name"},
    {header: "comment", accessor: "comment"},
    { header: "stage", accessor: "stage_id", byId: true, data: stages, key: "name" },
    { header: "type", accessor: "workspaceType_id", byId: true, data: workspaceTypes, key: "name" },
    { header: "Actions", accessor: "actions", edit: true }
  ]

  return (
  <DataTable columns={columnsSetup} data={workspaces} />
  )
  
}

export default WorkspaceListPage;


import { Link, useRouteLoaderData } from "react-router-dom";
import DataTable from "../../../../utils/datatable";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { Stage } from "../interfaces/Stage.interface";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";

interface ErrorResponse {
  error: string;
}

type RouteLoaderData = Stage[] | ErrorResponse;

function StagesListPage() {

//handle fetching
const routeData = useRouteLoaderData('stages') as Stage[] | FetchError;
  
if('error' in routeData){
  return (
    <FetchErrorComponent errors={routeData.error}/>
  );
}
const stages = routeData;

  
  const columnsSetup = [
    {header: "name", accessor: "name"},
    {header: "comment", accessor: "comment"},
    { header: "Actions", accessor: "actions", edit: true }
  ]
  
  return (
    <>
    <Box>
    <Button as={Link} to="new" variant="solid" colorScheme="purple">
      Add new Stage
    </Button>
    </Box>
    
    <DataTable columns={columnsSetup} data={stages} />
    
    </>
  )
}

export default StagesListPage;

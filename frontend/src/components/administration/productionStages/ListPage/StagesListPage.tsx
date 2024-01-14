import { Link, useRouteLoaderData } from "react-router-dom";
import DataTable from "../utils/datatable";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { Stage } from "../interfaces/Stage.interface";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";

interface ErrorResponse {
  error: string;
}

type RouteLoaderData = Stage[] | ErrorResponse;

function StagesListPage() {

//handle error from router fetching
  const routeData = useRouteLoaderData("stages") as RouteLoaderData;
  
  if('error' in routeData){
    return (
      <FetchErrorComponent error={routeData.error}/>
    );
  }

//if there is no error from router fetching

  
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
    
    <DataTable columns={columnsSetup} data={routeData} />
    
    </>
  )
}

export default StagesListPage;

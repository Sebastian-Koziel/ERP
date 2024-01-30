import { Link, useLoaderData} from "react-router-dom";
import DataTable from "../../../../utils/datatable";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { Operation } from "../Interfaces/Operations.interface";
import { FetchError } from "../Utils/newOperationLoader";
import { Button } from "@chakra-ui/react";



function OperationsListPage() {
  //handle fetching
  const routeData = useLoaderData() as Operation[] | FetchError;
  
  if('error' in routeData){
    return (
      <FetchErrorComponent errors={routeData.error}/>
    );
  }
const operations = routeData;

  const columnsSetup = [
    {header: "name", accessor: "name"},
    {header: "comment", accessor: "comment"},
    { header: "Actions", accessor: "actions", edit: true }
  ]

  return (
    <>
    <Button as={Link} to="new" variant="solid" colorScheme="purple">
    Add new operation
  </Button>
  <DataTable columns={columnsSetup} data={operations} />
  </>
  )
}

export default OperationsListPage;



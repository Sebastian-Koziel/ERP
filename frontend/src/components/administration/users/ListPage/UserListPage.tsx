import { Link, useLoaderData } from "react-router-dom";
import { User } from "../Interfaces/user.interface";
import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { Button } from "@chakra-ui/react";
import DataTable from "../../../../utils/datatable";


function UserListPage() {
  //handle fetching
  const routeData = useLoaderData() as User[] | FetchError;
  
  if('error' in routeData){
    return (
      <FetchErrorComponent errors={routeData.error}/>
    );
  }
const operations = routeData;

  const columnsSetup = [
    {header: "name", accessor: "name"},
    {header: "surname", accessor: "surname"},
    {header: "role", accessor: "role"},
    { header: "actions", accessor: "", edit: true }
  ]

  return (
    <>
    <Button as={Link} to="new" variant="solid" colorScheme="purple">
    Add user
  </Button>
  <DataTable columns={columnsSetup} data={operations} />
  </>
  )
}

export default UserListPage;



import { Link, useLoaderData} from "react-router-dom";
import { Product } from "../Interfaces/Products.interface";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";
import { Box, Button } from "@chakra-ui/react";
import DataTable from "../../../../utils/datatable";



function ProductsListPage() {
  //handle fetching
  const routeData = useLoaderData() as Product[] | FetchError;
      
if('error' in routeData){
  return (
    <FetchErrorComponent errors={routeData.error}/>
  );
}

const products = routeData;

const columnsSetup = [
  {header: "name", accessor: "name"},
  {header: "comment", accessor: "comment"},
  { header: "Actions", accessor: "actions", edit: true }
]

return (
  <>
  <Box>
  <Button as={Link} to="new" variant="solid" colorScheme="purple">
    Add new product
  </Button>
  </Box>

<DataTable columns={columnsSetup} data={products} />
</>
)

}

export default ProductsListPage;




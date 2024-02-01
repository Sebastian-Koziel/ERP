import { Link, useLoaderData } from "react-router-dom";
import { FetchError } from "../utils/newOrderLoader";
import { Order } from "../Interfaces/Order.interface";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { Button } from "@chakra-ui/react";
import DataTable from "../../../../utils/datatable";


function OrdersListPage() {
 //handle fetching
 const routeData = useLoaderData() as Order[] | FetchError;
  
 if('error' in routeData){
   return (
     <FetchErrorComponent errors={routeData.error}/>
   );
 }
const orders = routeData;

 const columnsSetup = [
   {header: "name", accessor: "name"},
   {header: "order no", accessor: "externalOrderNo"},
   {header: "comment", accessor: "comment"},
   { header: "Actions", accessor: "actions", edit: true }
 ]

 return (
   <>
   <Button as={Link} to="new" variant="solid" colorScheme="purple">
   Create new order
 </Button>
 <DataTable columns={columnsSetup} data={orders} />
 </>
 )
}
export default OrdersListPage;




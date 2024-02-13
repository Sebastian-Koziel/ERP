import { useLoaderData } from "react-router-dom";
import { OperationHandler } from "../Interfaces/operationHandler.interface";
import DataTable from "../../../../utils/datatable";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";


function ProductionListPage() {
   //handle fetching
   const routeData = useLoaderData() as OperationHandler[] | FetchError;
  
   if('error' in routeData){
     return (
       <FetchErrorComponent errors={routeData.error}/>
     );
   }
 const operations = routeData;
 
   const columnsSetup = [
     {header: "name", accessor: "name"},
     {header: "totalQty", accessor: "totalQty"},
     {header: "plannedStart", accessor: "plannedStart", date:true},
     {header: "plannedFinish", accessor: "plannedFinish", date:true},
     { header: "Actions", accessor: "actions", edit: true }
   ]
 
   return (
     <>
   <DataTable columns={columnsSetup} data={operations} />
   </>
   )
 }

export default ProductionListPage;



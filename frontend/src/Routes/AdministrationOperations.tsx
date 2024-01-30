
import EditOperationComponent from "../components/administration/operations/Edit/EditOperation";
import OperationsListPage from "../components/administration/operations/ListPage/OperationsListPage";
import OperationsRoot from "../components/administration/operations/Root/OperationsRoot";
import { editOperationLoader } from "../components/administration/operations/Utils/editOperationLoader";
import { fetchAllOperations } from "../components/administration/operations/Utils/fetchAllOperations";
import { newOperationLoader } from "../components/administration/operations/Utils/newOperationLoader";
import AddNewOperation from "../components/administration/operations/new/AddNewOperation";


const operationsRoutes = {
    path: "operations",
    element: <OperationsRoot />,
    children: [
      {
        index: true,
        element: <OperationsListPage />,
        loader: fetchAllOperations,
      },
      {
        path: "new",
        element: <AddNewOperation />,
        loader: newOperationLoader
      },
      {
        path: ":operationId",
        element: <EditOperationComponent />,
        loader: editOperationLoader, 
      },
    ],
  };
  
  export { operationsRoutes };
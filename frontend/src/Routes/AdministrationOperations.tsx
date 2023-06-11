
import OperationsListPage, { operationsLoader } from "../components/administration/operations/ListPage/OperationsListPage";
import OperationsRoot from "../components/administration/operations/Root/OperationsRoot";
import AddNewOperation, { newOperationLoader } from "../components/administration/operations/new/AddNewOperation";
import { action as AddNewOperationAction } from "../components/administration/operations/new/AddNewOperation";

const operationsRoutes = {
    path: "operations",
    element: <OperationsRoot />,
    children: [
      {
        index: true,
        id: "operations",
        element: <OperationsListPage />,
        loader: operationsLoader,
      },
      {
        path: "new",
        id:"newOperation",
        element: <AddNewOperation />,
        action: AddNewOperationAction,
        loader: newOperationLoader
      },
      {
        /* path: ":stageId",
        id: "stagesLoader",
        loader: singleStagesLoader,
        children: [
          {
            path: "",
            element: <SingleStagePage />,
          },
          {
            path: "edit",
            element: <EditStage />,
          },
        ], */
      },
    ],
  };
  
  export { operationsRoutes };
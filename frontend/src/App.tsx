import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//ChakraUI
import { ChakraProvider } from "@chakra-ui/react";
//ROUTES
//login
import CompanyLogin from "./components/companyLogin/CompanyLogin";
//client
import ClientSideRoot from "./components/clientside/ClientSideRoot";
//administration
import AdministrationRoot from "./components/administration/administrationRoot/AdministrationRoot";
import Summary from "./components/administration/summary/Summary";
//administration - users
import { userRoutes } from "./Routes/AdministratioUsers";
//administration - stages
import { stagesRoutes } from "./Routes/AdministrationStages";
//auth
import { workspacesRoutes } from "./Routes/AdministrationWorkspaces";
import { operationsRoutes } from "./Routes/AdministrationOperations";
import { productsRoutes } from "./Routes/AdministrationProducts";
import { ordersRoutes } from "./Routes/AdministrationOrders";
import { productionRoutes } from "./Routes/AdministrationProduction";
//production view
import ProductionRoot from "./components/production/Root/ProductionRoot";
import OperationHandlerDetails, { operationHandlerLoader } from "./components/production/Details/operationHandlerDetails";
import OperationHanldersList from "./components/production/StagePage/OperationHanldersList";
import CanvasRoot from "./components/CanvasTest/Root/CanvasRoot";
import { planRoutes } from "./Routes/AdministrationPlan";



const router = createBrowserRouter([
  {
    path: "/",
    element: <CompanyLogin />,
    //action: action,
  },
  {
    path: "/production",
    element: <ProductionRoot />,
    children: [
      {
        path: "",
        element: <OperationHanldersList />, 
      }, 
      {
        path: ":operationHandlerId",
        element: <OperationHandlerDetails />, 
        loader: operationHandlerLoader
      }, 
    ],
  },
  {
    path: "/client",
    element: <ClientSideRoot />,
  },
  {
    path: "/canvas",
    element: <CanvasRoot />,
  },
  {
    path: "/administration",
    element: <AdministrationRoot />,
    id: "root",
    children: [
      {
        index: true,
        element: <Summary />,
      },
      userRoutes,
      planRoutes,
      operationsRoutes,
      stagesRoutes,
      workspacesRoutes,
      productsRoutes,
      ordersRoutes,
      productionRoutes
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

/*TODO
przy logowaniu sprawdzic token jak jest to od razu nav w zaleznosci od roli
*/

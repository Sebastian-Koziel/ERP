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
import CanvasRoot from "./components/CanvasTest/Root/CanvasRoot";
import { planRoutes } from "./Routes/AdministrationPlan";
import ProductionMainPage from "./components/production/ProductionMainPage/ProductionMainPage";
import { fetchAllStages } from "./components/administration/productionStages/utils/fetchAllStages";
import { operationHandlerDetailsLoader } from "./components/production/Utils/operationHandlerDetailsLoader";
import { OperationHandlerDetails } from "./components/production/Details/operationHandlerDetails";



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
        element: <ProductionMainPage />,
        loader: fetchAllStages 
      }, 
      {
        path: ":operationHandlerId",
        element: <OperationHandlerDetails />,
        loader: operationHandlerDetailsLoader 
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

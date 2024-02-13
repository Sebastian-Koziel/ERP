import ProductionListPage from "../components/administration/Production/ListPage/ProductionListPage";
import ProductionRoot from "../components/administration/Production/Root/ProductionRoot";
import { fetchAllOperationHandlers } from "../components/administration/Production/Utils/fectchAllOperationHandlers";


const productionRoutes = {
  path: "production",
  element: <ProductionRoot />,
  children: [
    {
      index: true,
      element: <ProductionListPage />,
      loader: fetchAllOperationHandlers,
    },
    
  ],
};

export { productionRoutes };

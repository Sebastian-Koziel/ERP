
import AddNewProduct, { action as AddNewProductAction } from "../components/administration/products/New/AddNewProduct";
import ProductsListPage, { productsLoader } from "../components/administration/products/ListPage/ProductsListPage";
import { newProductLoader } from "../components/administration/products/New/AddNewProduct";
import ProductsRoot from "../components/administration/products/Root/ProductsRoot";

const productsRoutes = {
    path: "products",
    element: <ProductsRoot />,
    children: [
      {
        index: true,
        id: "products",
        element: <ProductsListPage />,
        loader: productsLoader,
      },
      {
        path: "new",
        id:"newProduct",
        element: <AddNewProduct />,
        action: AddNewProductAction,
        loader: newProductLoader
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
  
  export { productsRoutes };
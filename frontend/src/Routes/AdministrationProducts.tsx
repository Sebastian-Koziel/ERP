
import AddNewProduct from "../components/administration/products/New/AddNewProduct";
import ProductsListPage from "../components/administration/products/ListPage/ProductsListPage";
import ProductsRoot from "../components/administration/products/Root/ProductsRoot";
import { fetchAllProducts } from "../components/administration/products/utils/fetchAllProducts";
import { newProductLoader } from "../components/administration/products/utils/newProductLoader";

const productsRoutes = {
    path: "products",
    element: <ProductsRoot />,
    children: [
      {
        index: true,
        id: "products",
        element: <ProductsListPage />,
        loader: fetchAllProducts,
      },
      {
        path: "new",
        id:"newProduct",
        element: <AddNewProduct />,
        //action: AddNewProductAction,
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
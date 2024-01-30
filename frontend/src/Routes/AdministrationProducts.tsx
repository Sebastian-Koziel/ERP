
import AddNewProduct from "../components/administration/products/New/AddNewProduct";
import ProductsListPage from "../components/administration/products/ListPage/ProductsListPage";
import ProductsRoot from "../components/administration/products/Root/ProductsRoot";
import { fetchAllProducts } from "../components/administration/products/utils/fetchAllProducts";
import { newProductLoader } from "../components/administration/products/utils/newProductLoader";
import { editProductLoader } from "../components/administration/products/utils/editProductLoader";
import EditProduct from "../components/administration/products/Edit/EditProduct";

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
        path: ":product_id",
        loader: editProductLoader,
        element: <EditProduct />,
      },
    ],
  };
  
  export { productsRoutes };
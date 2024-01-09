import OrdersListPage from "../components/administration/orders/ListPage/OrdersListPage";
import OrdersRoot from "../components/administration/orders/Root/OrdersRoot";
import { ordersLoader } from "../components/administration/orders/ListPage/OrdersListPage";
import AddNewOrder, {action as addNewOrderAction} from "../components/administration/orders/new/AddOrder";
import { productsLoader } from "../components/administration/products/ListPage/ProductsListPage";
import OrderDetailsRoot, { orderByIdLoader } from "../components/administration/orders/Details/OrderDetails";

const ordersRoutes: any = {
    path: "orders",
    element: <OrdersRoot />,
    children: [
      {
        index: true,
        loader: ordersLoader,
        element: <OrdersListPage />,
      
      },
       {
        path: "new",
        element: <AddNewOrder />,
        action: addNewOrderAction,
        loader: productsLoader
      },
      
      {
        path: ":orderId",
        element: <OrderDetailsRoot />,
        loader: orderByIdLoader, 
      }, 
    ],
  };
  export { ordersRoutes };
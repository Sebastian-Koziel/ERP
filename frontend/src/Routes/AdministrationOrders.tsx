import OrdersListPage from "../components/administration/orders/ListPage/OrdersListPage";
import OrdersRoot from "../components/administration/orders/Root/OrdersRoot";
import { ordersLoader } from "../components/administration/orders/ListPage/OrdersListPage";

import OrderDetailsRoot, { orderByIdLoader } from "../components/administration/orders/Details/OrderDetails";
import { newOrderLoader } from "../components/administration/orders/utils/newOrderLoader";
import AddNewOrder from "../components/administration/orders/new/AddOrder";

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
        loader: newOrderLoader
      },
      
      {
        path: ":orderId",
        element: <OrderDetailsRoot />,
        loader: orderByIdLoader, 
      }, 
    ],
  };
  export { ordersRoutes };
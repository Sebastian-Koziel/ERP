import OrdersListPage from "../components/administration/orders/ListPage/OrdersListPage";
import OrdersRoot from "../components/administration/orders/Root/OrdersRoot";

import { newOrderLoader } from "../components/administration/orders/utils/newOrderLoader";
import AddNewOrder from "../components/administration/orders/new/AddOrder";
import { fetchAllOrders } from "../components/administration/orders/utils/fetchAllOrders";
import { editOrderLoader } from "../components/administration/orders/utils/orderDetailsLoader";
import OrderDetails from "../components/administration/orders/Details/OrderDetails";

const ordersRoutes: any = {
    path: "orders",
    element: <OrdersRoot />,
    children: [
      {
        index: true,
        loader: fetchAllOrders,
        element: <OrdersListPage />,
      
      },
       {
        path: "new",
        element: <AddNewOrder />,
        loader: newOrderLoader
      },
      
      {
        path: ":orderId",
        element: <OrderDetails />,
        loader: editOrderLoader, 
      }, 
    ],
  };
  export { ordersRoutes };
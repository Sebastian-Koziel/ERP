import { useLoaderData } from "react-router-dom";
import OrderesList from "../List/OrdersList";

function OrdersListPage() {
  const orders = useLoaderData();
  return (
    <OrderesList orders={orders} />
  
  );
}

export default OrdersListPage;



export const ordersLoader = async (): Promise<[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/orders", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


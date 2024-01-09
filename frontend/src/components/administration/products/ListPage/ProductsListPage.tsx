import { useRouteLoaderData } from "react-router-dom";
import { Product } from "../Interfaces/Products.interface";
import ProductsList from "../List/ProductsList";



function ProductsListPage() {
  const products = useRouteLoaderData("products");
  return <ProductsList products={products} />;
}

export default ProductsListPage;



export const productsLoader = async (): Promise<Product[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/products", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


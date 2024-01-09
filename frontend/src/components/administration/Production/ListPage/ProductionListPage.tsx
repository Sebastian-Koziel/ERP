import { useLoaderData } from "react-router-dom";
import { OperationHandler } from "../Interfaces/operationHandler.interface";
import ProductionList from "../List/ProductionList";


function ProductionListPage() {
  const operations = useLoaderData();
console.log(operations)
  return <ProductionList operations={operations} />;
}

export default ProductionListPage;



export const productionLoader = async (): Promise<OperationHandler[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/operation-handlers", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


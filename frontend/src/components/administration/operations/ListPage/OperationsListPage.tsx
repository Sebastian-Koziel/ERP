import { useRouteLoaderData } from "react-router-dom";
import { Operation } from "../Interfaces/Operations.interface";
import OperaionsList from "../List/OperationsList";



function OperationsListPage() {
  const operations = useRouteLoaderData("operations");

  return <OperaionsList operations={operations} />;
}

export default OperationsListPage;



export const operationsLoader = async (): Promise<Operation[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/operations", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


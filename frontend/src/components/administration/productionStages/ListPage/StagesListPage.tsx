import { useRouteLoaderData } from "react-router-dom";
import "./StagesListPage.css";
import { Stage } from "../interfaces/Stage.interface";
import StagesList from "../List/StagesList";

function StagesListPage() {
  const stages = useRouteLoaderData("stages");
  
  return <StagesList stages={stages} />;
}

export default StagesListPage;


export const stagesLoader = async (): Promise<Stage[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/stages", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};
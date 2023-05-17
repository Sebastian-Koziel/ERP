import ListStages from "../listStages/ListStages";
import { useRouteLoaderData } from "react-router-dom";

import "./StagePage.css";

interface StageData {
  results: Stage[];
}

function StagePage() {
  const stages = useRouteLoaderData("stages");

  return <ListStages stages={stages} />;
}

export default StagePage;

interface Stage {
  id: number;
  name: string;
}

interface StageData {
  results: Stage[];
}

export const stagesLoader = async (): Promise<StageData> => {
  const response = await fetch("http://localhost:5000/url");

  const data = await response.json();
  return data;
};

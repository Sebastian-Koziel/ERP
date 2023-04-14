
import { useLoaderData } from 'react-router-dom';

import './SingleStagePage.css'


interface Stage {
    id: number,
    name: string
  }

  interface MyLoaderProps {
    stageId: number;
  }

function SingleStagePage() {
  const stage = useLoaderData();
  
  return (
    <div>{stage.name}</div>
  )
}

export default SingleStagePage


export const singleStagesLoader = async ({ request, params }): Promise<Stage> => {
  const stageId = params.stageId;
  

  const response = await fetch ("http://localhost:5000/url/" +stageId);

  const data = await response.json();
  return data  ;
}
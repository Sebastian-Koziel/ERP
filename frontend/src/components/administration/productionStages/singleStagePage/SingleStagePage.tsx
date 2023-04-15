
import { useRouteLoaderData, Link } from 'react-router-dom';

import './SingleStagePage.css'


interface Stage {
    id: number,
    name: string
  }

  interface MyLoaderProps {
    stageId: number;
  }


function SingleStagePage() {
  const stage = useRouteLoaderData("stagesLoader");
  
  return (
    <>
    <div>{stage.name}</div>
    <Link to='edit'>edit</Link>
    </>
  )
}

export default SingleStagePage


export const singleStagesLoader = async ({ params }: { params: MyLoaderProps }): Promise<Stage> => {
  const stageId = params.stageId;
  

  const response = await fetch ("http://localhost:5000/url/" +stageId);

  const data = await response.json();
  return data  ;
}
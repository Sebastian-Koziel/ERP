import { useState } from "react";
import StagesBar from "../StageTopBar/StagesBar";
import { storageGetUser } from "../../../utils/localhostHandlers";
import SingleStagePage from "../StagePage/SingleStagePage";
import FetchErrorComponent from "../../errorHandling/FetchErrorComponent";
import { useLoaderData } from "react-router-dom";
import { Stage } from "../../administration/productionStages/interfaces/Stage.interface";
import { FetchError } from "../Utils/singleStageLoader";


function ProductionMainPage() {
  //handle fetching
  const routeData = useLoaderData() as Stage[] | FetchError;
  
  if('error' in routeData){
    return (
      <FetchErrorComponent errors={routeData.error}/>
    );
  }

const stages = routeData;

  //get user info
  const user = storageGetUser();
  const userStages:string[] = user.access.production.stagesAccess;

  //current stage id
  const [currentStageId, setCurrentStageId] = useState<string>(user.access.production.mainStage);

  if (!userStages.length) {
    return <p>You have no assigned role. Please contact your supervisor</p>; 
  }

  return (
      <>
      <StagesBar setCurrentStageId={setCurrentStageId} userStages={userStages} stages={stages}/>
      <SingleStagePage currentStageId={currentStageId}/>
      </>
    );
}

export default ProductionMainPage;


  


 



 
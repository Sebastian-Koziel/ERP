import StagesRoot from '../components/administration/productionStages/stagesRoot/StagesRoot';
import StagePage from '../components/administration/productionStages/StagesPage/StagesPage';
import { stagesLoader } from '../components/administration/productionStages/StagesPage/StagesPage';
import AddNewStage, { action as newStageAction } from '../components/administration/productionStages/addNewStage/AddnewStage';
import SingleStagePage, { singleStagesLoader } from '../components/administration/productionStages/singleStagePage/SingleStagePage';
import EditStage from '../components/administration/productionStages/editStage/EditStage';

const stagesRoutes = { 
    path: 'stages', 
    element: <StagesRoot />,
    children: [
      { 
        index:true,
        id: 'stages', 
        element: <StagePage />,
        loader: stagesLoader
      },
      { 
        path: 'new', 
        element: <AddNewStage />,
        action: newStageAction
      },
      {
        path: ":stageId",
        id: "stagesLoader",
        loader: singleStagesLoader,
        children: [
          { 
            path: '', 
            element: <SingleStagePage />,  
          },
          { 
            path: 'edit', 
            element: <EditStage />,  
          },
        ]
      }
      
    ]
  };

  export { stagesRoutes }
import StagesRoot from "../components/administration/productionStages/Root/StagesRoot";
import AddNewStage from "../components/administration/productionStages/New/AddnewStage";
import SingleStagePage from "../components/administration/productionStages/singleStagePage/SingleStagePage";
import StagesListPage from "../components/administration/productionStages/ListPage/StagesListPage";
import { fetchStageById } from "../components/administration/productionStages/utils/fetchStageById";
import { fetchAllStages } from "../components/administration/productionStages/utils/fetchAllStages";
import ErrorBoundary from "../components/errorHandling/ErrorBoundary";

const stagesRoutes = {
  path: "stages",
  element: <StagesRoot />,
  children: [
    {
      index: true,
      id: "stages",
      element: <StagesListPage />,
      loader: fetchAllStages,
    },
    {
      path: "new",
      element: <AddNewStage />,
      //action: addNewStage,
    },
    {
      path: ":stageId",
      id: "singleStageLoader",
      loader: fetchStageById,
      children: [
        {
          path: "",
          element: <SingleStagePage />,
        } 
      ],
    },
  ],
};

export { stagesRoutes };

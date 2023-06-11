import StagesRoot from "../components/administration/productionStages/Root/StagesRoot";
import AddNewStage, {action as addNewStage} from "../components/administration/productionStages/New/AddnewStage";
import SingleStagePage, {singleStagesLoader,} from "../components/administration/productionStages/singleStagePage/SingleStagePage";
import EditStage from "../components/administration/productionStages/editStage/EditStage";
import StagesListPage, { stagesLoader } from "../components/administration/productionStages/ListPage/StagesListPage";

const stagesRoutes = {
  path: "stages",
  element: <StagesRoot />,
  children: [
    {
      index: true,
      id: "stages",
      element: <StagesListPage />,
      loader: stagesLoader,
    },
    {
      path: "new",
      element: <AddNewStage />,
      action: addNewStage,
    },
    {
      path: ":stageId",
      id: "stagesLoader",
      loader: singleStagesLoader,
      children: [
        {
          path: "",
          element: <SingleStagePage />,
        },
        {
          path: "edit",
          element: <EditStage />,
        },
      ],
    },
  ],
};

export { stagesRoutes };

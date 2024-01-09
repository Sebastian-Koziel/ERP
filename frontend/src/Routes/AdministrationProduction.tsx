import ProductionListPage, { productionLoader } from "../components/administration/Production/ListPage/ProductionListPage";
import ProductionRoot from "../components/administration/Production/Root/ProductionRoot";


const productionRoutes = {
  path: "production",
  element: <ProductionRoot />,
  children: [
    {
      index: true,
      element: <ProductionListPage />,
      loader: productionLoader,
    },
    /* {
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
    }, */
  ],
};

export { productionRoutes };

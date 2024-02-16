import PlanMainPage from "../components/administration/plan/PlanMainPage/PlanMainPage";
import PlanRoot from "../components/administration/plan/Root/PlanRoot";
import { planMainPageLoader } from "../components/administration/plan/Utils/planMainPageLoader";

const planRoutes: any = {
    path: "plan",
    element: <PlanRoot />,
    children: [
      {
        index: true,
        loader: planMainPageLoader,
        element: <PlanMainPage/>,
      }
    ],
  };
  export { planRoutes };
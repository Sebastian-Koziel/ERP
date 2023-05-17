import UsersRoot from "../components/administration/users/Root/UsersRoot";
import UserListPage, {
  usersLoader,
  deleteUser,
} from "../components/administration/users/ListPage/UserListPage";
import AddNewUser, {
  action as addNewUser,
} from "../components/administration/users/New/AddNewUser";
import { userByIdLoader as findUser } from "../components/administration/users/Details/GeneralInfo/UserGeneralInfo";
import UserGeneralInfo from "../components/administration/users/Details/GeneralInfo/UserGeneralInfo";
import UserAccess, {
  updateAccess,
} from "../components/administration/users/Details/AccessAndRoles/AccessAndRoles";
import UsersDetailsRoot from "../components/administration/users/Details/DetailsPage/DetailsPage";

const userRoutes: any = {
  path: "users",
  element: <UsersRoot />,
  children: [
    {
      index: true,
      id: "user",
      element: <UserListPage />,
      loader: usersLoader,
      action: deleteUser,
    },
    {
      path: "new",
      element: <AddNewUser />,
      action: addNewUser,
    },
    {
      path: ":userId",
      id: "singleUserLoader",
      element: <UsersDetailsRoot />,
      loader: findUser,
      children: [
        {
          index: true,
          element: <UserGeneralInfo />,
        },
        {
          path: "access",
          element: <UserAccess />,
          action: updateAccess,
        },
      ],
    },
  ],
};
export { userRoutes };

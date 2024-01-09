import UsersRoot from "../components/administration/users/Root/UsersRoot";
import UserListPage from "../components/administration/users/ListPage/UserListPage";
import AddNewUser, {action as addNewUser,} from "../components/administration/users/New/AddNewUser";

import UsersDetailsRoot, { userByIdLoader } from "../components/administration/users/Details/Root/UserDetailRoot";
import { usersLoader } from "../components/administration/users/Utils/fetchUsers";

const userRoutes: any = {
  path: "users",
  element: <UsersRoot />,
  children: [
    {
      index: true,
      element: <UserListPage />,
      loader: usersLoader
    },
    {
      path: "new",
      element: <AddNewUser />,
      action: addNewUser,
    },
    {
      path: ":userId",
      element: <UsersDetailsRoot />,
      loader: userByIdLoader,
    },
  ],
};
export { userRoutes };

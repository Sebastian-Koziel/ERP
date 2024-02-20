import UsersRoot from "../components/administration/users/Root/UsersRoot";
import UserListPage from "../components/administration/users/ListPage/UserListPage";
import AddNewUser, {action as addNewUser,} from "../components/administration/users/New/AddNewUser";
import { fetchAllUsers } from "../components/administration/users/Utils/fetchAllUsers";
import { editUserLoader } from "../components/administration/users/Utils/editUserLoader";
import UsersDetailsRoot from "../components/administration/users/Details/Root/UserDetailRoot";

const userRoutes: any = {
  path: "users",
  element: <UsersRoot />,
  children: [
    {
      index: true,
      element: <UserListPage />,
      loader: fetchAllUsers
    },
    {
      path: "new",
      element: <AddNewUser />,
      action: addNewUser,
    },
    {
      path: ":userId",
      element: <UsersDetailsRoot />,
      loader: editUserLoader,
    },
  ],
};
export { userRoutes };


import UsersRoot from '../components/administration/users/Root/UsersRoot';
import UserListPage, { usersLoader, deleteUser} from '../components/administration/users/ListPage/UserListPage';
import AddNewUser, {action as addNewUser} from '../components/administration/users/New/AddNewUser';
import UserDetails, {userByIdLoader as findUser} from '../components/administration/users/Details/UserDetails';

const userRoutes:any = {
    path: 'users', 
          element: <UsersRoot />,
          children: [
            {
              index: true,
              id:'user',
              element: <UserListPage />,
              loader: usersLoader,
              action: deleteUser
            },
            { 
              path: 'new', 
              element: <AddNewUser />,
              action: addNewUser
            },
            { 
              path: ':userId', 
              id: 'singleUserLoader',
              element: <UserDetails />,
              loader: findUser
            },  
          ]
  }
export {userRoutes};
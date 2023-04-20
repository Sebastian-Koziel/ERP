
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import AdministrationRoot from './components/administration/administrationRoot/AdministrationRoot';

import Summary from './components/administration/summary/Summary';

import StagesRoot from './components/administration/productionStages/stagesRoot/StagesRoot';
import StagePage from './components/administration/productionStages/StagesPage/StagesPage';
import { stagesLoader } from './components/administration/productionStages/StagesPage/StagesPage';
import AddNewStage, { action as newStageAction } from './components/administration/productionStages/addNewStage/AddnewStage';

import CompanyLogin, {action} from './components/companyLogin/CompanyLogin';

import ProductionStage from './components/production/ProductionStage';
import SingleStagePage, { singleStagesLoader } from './components/administration/productionStages/singleStagePage/SingleStagePage';
import EditStage from './components/administration/productionStages/editStage/EditStage';

import ClientSideRoot from './components/clientside/ClientSideRoot';


import UsersRoot from './components/administration/users/Root/UsersRoot';
import UserListPage, { usersLoader, deleteUser} from './components/administration/users/ListPage/UserListPage';
import AddNewUser, {action as addNewUser} from './components/administration/users/New/AddNewUser';
import UserDetails, {userByIdLoader as findUser} from './components/administration/users/Details/UserDetails';

const userRoutes = {
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

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <CompanyLogin />,
    action: action
  },
  { 
    path: '/production', 
    element: <ProductionStage />
  },
  { 
    path: '/client', 
    element: <ClientSideRoot />
  },
  { 
    path: '/administration', 
    element: <AdministrationRoot />,
    children: [
      { 
        index: true, 
        element: <Summary />
      },
      userRoutes,
      { 
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
      },
    ]
  },
  
]);

  
function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App



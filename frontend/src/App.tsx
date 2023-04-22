
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//ROUTES
//login
import CompanyLogin, {action} from './components/companyLogin/CompanyLogin';
//production view
import ProductionStage from './components/production/ProductionStage';
//client
import ClientSideRoot from './components/clientside/ClientSideRoot';
//administration
import AdministrationRoot from './components/administration/administrationRoot/AdministrationRoot';
import Summary from './components/administration/summary/Summary';
//administration - users
import { userRoutes } from './Routes/AdministratioUsers';
//administration - stages
import { stagesRoutes } from './Routes/AdministrationStages';
//auth
import { logOut, tokenAndAccesLoader } from './services/auth';
import AdministrationAuth from './components/auth/AdministrationAuth';
import { Children } from 'react';



const router = createBrowserRouter([
  { 
    path: '/', 
    element: <CompanyLogin />,
    action: action,
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
    path: '/logout', 
    action: logOut
  },
  { 
    path: '/administration', 
    element: <AdministrationAuth />,
    children: [
      { 
        element: <AdministrationRoot />,
        id: 'root',
        loader: tokenAndAccesLoader,
        children: [
          { 
            index: true, 
            element: <Summary />
          },
          userRoutes,
          stagesRoutes
        ]
      }
    ]
  },
  
  
]);

  
function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App


/*TODO
uporzadkowac kod w app.tsx (routy)


*/
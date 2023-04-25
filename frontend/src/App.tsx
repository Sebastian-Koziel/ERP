
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
import { logOut } from './services/auth';





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
    element: <AdministrationRoot />,
    id: 'root',
    children: [
      { 
        index: true, 
        element: <Summary />
      },
      userRoutes,
      stagesRoutes
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
przy logowaniu sprawdzic token jak jest to od razu nav w zaleznosci od roli


*/
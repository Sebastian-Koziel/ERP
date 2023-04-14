
import './App.css'
import { Route, Routes, Navigate, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'

import AdministrationRoot from './components/administration/administrationRoot/AdministrationRoot';

import Summary from './components/administration/summary/Summary';

import StagesRoot from './components/administration/productionStages/stagesRoot/StagesRoot';
import StagePage from './components/administration/productionStages/StagesPage/StagesPage';
import { stagesLoader } from './components/administration/productionStages/StagesPage/StagesPage';
import AddNewStage from './components/administration/productionStages/addNewStage/AddnewStage';

import CompanyLogin from './components/companyLogin/CompanyLogin';

import ProductionStage from './components/production/ProductionStage';
import SingleStagePage, { singleStagesLoader } from './components/administration/productionStages/singleStagePage/SingleStagePage';



const router = createBrowserRouter([
  { 
    path: '', 
    element: <CompanyLogin />
  },
  { 
    path: '/production', 
    element: <ProductionStage />
  },
  { 
    path: '/administration', 
    element: <AdministrationRoot />,
    children: [
      { 
        path: '', 
        element: <Summary />
      },
      { 
        path: 'stages', 
        element: <StagesRoot />,
        children: [
          { 
            path: '', 
            element: <StagePage />,
            loader: stagesLoader
          },
          { 
            path: 'new', 
            element: <AddNewStage />
          },
          { 
            path: ':stageId', 
            element: <SingleStagePage />,
            loader: singleStagesLoader
          },
        ]
      },
    ]
  },
  
]);


/* const router = createBrowserRouter(createRoutesFromElements(
  
    <Route path="/administration" element={<AdministrationRoot />}>
      <Route index element={<Summary />}/>
      <Route path="stages" element={<StagesRoot />}>
        <Route index element={<ListStages />}/>
        <Route path="new" element={<AddNewStage />}/>
      </Route>
    </Route>


  
  
  
)) */

/* const router = createBrowserRouter([
  { 
    path: '/', 
    element: <CompanyLogin />
  },
  { 
    path: '/production', 
    element: <ProductionStage />
  },
  { 
    path: '/administration', 
    element: <AdministrationRoot />,
    children: [
      {
        path: '', 
        element: <Summary />, 
      },
      {
        path: 'stages', 
        element: <StagesRoot />, 
        children: [
          {
            path: '', 
            element: <ListStages />, 
          },
          {
            path: 'new', 
            element: <AddNewStage />, 
          },
        ]
      }
    ]
  },


]); */

/* const router = createBrowserRouter([
  { path: '/production', element: <ProductionStage />},

  { path: '/', element: <CompanyLogin />},

   { path: '/administration', element: <AdministrationRoot />, children: [
    { path: '', index: true, element: <Summary />},
    { path: 'stages', element: <StagesRoot />, children: [
      { path: '', index: true, element: <ListStages />},
      { path: 'new', element: <AddNewStage />},
      { path: ':stageId', element: <DetailsStage />},
      { path: ':stageId/edit', element: <EditStage />}
    ]},
   ]},
   


   return (
   <RouterProvider router={router} />
  )


 ]); */

function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App



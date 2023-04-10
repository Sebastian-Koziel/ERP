
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListStages from './components/administration/productionStages/listStages/ListStages'
import AddNewStage from './components/administration/productionStages/addNewStage/AddnewStage';
import MainView from './components/administration/mainView/mainView';


const router = createBrowserRouter([
  { path: '/', element: <MainView />},
   { path: '/adminStages', element: <ListStages />},
   { path: '/adminStages/new', element: <AddNewStage />}
 ]);

function App() {
  
  return (
   <RouterProvider router={router} />
  )
  
}

export default App

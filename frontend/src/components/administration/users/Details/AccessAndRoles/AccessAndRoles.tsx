import { User } from '../../Models/UserModels';
import { useRouteLoaderData } from "react-router-dom"

function UserAccess() {
  const user: any | User = useRouteLoaderData(`singleUserLoader`) ;
  
    return (
      <>
      <p>access {user.test}</p>
      
      </>
    )
  }
  
  export default UserAccess
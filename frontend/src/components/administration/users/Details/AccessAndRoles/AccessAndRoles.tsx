import { User } from '../../Models/UserModels';
import { useRouteLoaderData } from "react-router-dom"

function UserAccess() {
  const user: any | User = useRouteLoaderData(`singleUserLoader`) ;
  console.log(user.access.usersNav.general);
    return (
      <>
      <p>access: {user.access.usersNav.general? 'true' : `false`}</p>
      
      </>
    )
  }
  
  export default UserAccess
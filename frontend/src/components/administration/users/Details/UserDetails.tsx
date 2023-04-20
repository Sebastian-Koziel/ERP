import { useRouteLoaderData, Form } from 'react-router-dom';
import { User } from '../Models/UserModels';


function UserDetails() {
  const user: any | User = useRouteLoaderData(`singleUserLoader`) ;

  console.log(user)
   

  return (
    <>
    <div>
    <Form method='post'>

    <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          name="login"
          required
          value={user.login}
        />

    <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          value={user.password}
        />    
    </Form>

    </div>
    
    </>
  )
}

export default UserDetails

interface MyLoaderProps {
    userId: string;
  }

export const userByIdLoader = async ({ params }: { params: MyLoaderProps }): Promise<User> => {
    console.log(`sss`)
  const userId = params.userId;
  console.log(`front probuje wbic na usera ${userId}`)

  const response = await fetch ("http://localhost:5000/user/" +userId);

  const data = await response.json();

  
  

  return data  ;
} 
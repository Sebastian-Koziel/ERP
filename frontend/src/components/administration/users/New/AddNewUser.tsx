import { Form, json, redirect, useNavigate, useNavigation } from 'react-router-dom'
import "./AddNewUser.css";

function AddNewUser() {
  
    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
      }

  return (
    <section>
    <div>
    <Form method='post'>

    <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          name="login"
          required
          
        />

    <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          
        />

    <label htmlFor="role">Role</label>
      <select id="role" name="role">
          <option value="Administration">Administration</option>
          <option value="Production">Production</option>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
          
      </select>

      <input type="checkbox" id="access-productionStagesRoot" name="access-productionStagesRoot" value="true"/>
      <label htmlFor="access-productionStagesRoot"> Production stages</label>

      <button type="submit">ADD</button>

      <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
    </Form>

    </div>
    </section>
  )
}

export default AddNewUser

export async function action({request}:{request:Request}) {
  const data = await request.formData();
  
  const authData = {
    login: data.get('login'),
    password: data.get('password'),
    role: data.get('role'),
    test: data.get('access-productionStagesRoot')
  }
  console.log(authData)
  console.log('probuje dodac usera front');

  const response = await fetch('http://localhost:5000/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  //error handling
  if(response.status === 422 || response.status === 401) {
    console.log(`m1`)
    return response;
  }

  if(!response.ok) {
    console.log(`m2`)
    throw json({message: 'Could not authenticate user.'}, {status: 500});
  }
  

  console.log(`wsio ok`)
  //redirect
  return redirect("administration/users");
}
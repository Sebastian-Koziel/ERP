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

    <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          
        />

    <label htmlFor="surname">surname</label>
        <input
          id="surname"
          type="text"
          name="surname"
          required
          
        />

    <label htmlFor="role">Role</label>
      <select id="role" name="role">
          <option value="Administration">Administration</option>
          <option value="Production">Production</option>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
          
      </select>

      

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
    name: data.get('name'),
    surname: data.get('surname'),
    role: data.get('role'),  
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

  const resData:string = await response.json();
  
  console.log(resData);

  console.log(`wsio ok`)
  //redirect
  return redirect("/administration/users/" + resData);
}
import { redirect, Form, json, Navigate } from "react-router-dom";

import './CompanyLogin.css'
import { isLogged } from "../../services/auth";

function CompanyLogin() {

  

  return (
    <>
    {isLogged() && <Navigate to="/administration"/>}
    
    <div className="log-form">
    <h2>Login to your company</h2>
    <Form method='post'>
      <input type="text" title="login" name="login" placeholder="username" />
      <input type="password" title="password" name="password" placeholder="password" />
      <button type="submit" className="btn">Login</button>
      
    </Form>
    </div>
    </>
  )
}

export default CompanyLogin


export async function action({request}:{request:Request}) {
  

  const data = await request.formData();
  const authData = {
    login: data.get('login'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const user = resData.user;

  console.log(user.access)

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  localStorage.setItem('access', JSON.stringify(user.access));

  if(user.access.role === "Admin" || user.role === "Administration"){
  return redirect('/administration');
  }
  if(user.access.role === "Production"){
    return redirect('/production');
    }
  if(user.access.role === "Client"){
      return redirect('/client');
    }

    return null;
}
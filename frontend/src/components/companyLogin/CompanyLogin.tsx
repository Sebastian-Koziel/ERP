import { useRef } from "react";
import { useNavigate, redirect, Form, json } from "react-router-dom";

import './CompanyLogin.css'

function CompanyLogin() {

  const navigate = useNavigate();
  const inpu = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    if(inpu.current?.value === 'druk'){
      
      navigate('/production')
    } 

    if(inpu.current?.value === 'admin'){
      navigate('/administration')
    } 
    if(inpu.current?.value === 'client'){
      navigate('/client')
    }
    
  }

  return (
    <>
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
  console.log(`trying to log`)

  const data = await request.formData();
  const authData = {
    login: data.get('login'),
    password: data.get('password'),
  };

  console.log(authData)

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

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  if(resData.user.role === "Admin" || resData.user.role === "Administration"){
  return redirect('/administration');
  }
  if(resData.user.role === "Production"){
    return redirect('/production');
    }
  if(resData.user.role === "Client"){
      return redirect('/client');
    }
}
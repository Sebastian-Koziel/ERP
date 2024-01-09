import { redirect, Form, json, Navigate } from "react-router-dom";

import {
  Container,
  Input,
  Button,
  Heading,
  InputGroup,
  Stack,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { isLogged } from "../../services/auth";
import { useState } from "react";

interface LoginResponse {
  message?: string;
}

function CompanyLogin() {

  const [error, setError] = useState<string | null>(null); // State to store the error

  //handle form submit
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const authData = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      //handle error from the back
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        setError(errorData.message);
        return;
      }

      //on success
      const resData = await response.json();
      const token = resData.access_token;
      const user = resData.user;

      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      localStorage.setItem("access", JSON.stringify(user.access));


    //handle different errors
    } catch (err) {
      setError('Network error');
    }
  };


  return (
    <>
      {isLogged() && <Navigate to="/administration" />}

      <Container>
        <Heading mt="50%" mb="1.5rem" ml="2.5rem">
          Login to your company
        </Heading>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Form method="post" onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1}>
                <Input
                  type="text"
                  title="login"
                  name="login"
                  placeholder="Enter username"
                  borderColor={error ? 'red.500' : 'gray.200'}
                />
                <Input
                  type="password"
                  title="password"
                  name="password"
                  placeholder="Enter password"
                  borderColor={error ? 'red.500' : 'gray.200'}
                />
              </Stack>
              <Button type="submit" className="btn" colorScheme="purple">
                Login
              </Button>
            </Stack>
          </InputGroup>
        </Form>
      </Container>
    </>
  );
}


export default CompanyLogin;



export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    login: data.get("login"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.access_token;
  const user = resData.user;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  localStorage.setItem("access", JSON.stringify(user.access));



  if (user.access.role === "Admin" || user.role === "Administration") {
    return redirect("/administration");
  }
  if (user.access.role === "Production") {
    return redirect("/production");
  }
  if (user.access.role === "Client") {
    return redirect("/client");
  }

  return null;
}

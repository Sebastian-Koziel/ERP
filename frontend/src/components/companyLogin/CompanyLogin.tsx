import { useState, FormEvent } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import {
  Container, Input, Button, Heading, InputGroup, Stack, Alert, AlertIcon
} from '@chakra-ui/react';
import { isLogged } from '../../services/auth';
import { User } from '../administration/users/Interfaces/user.interface';

interface ErrorResponse {
  message: string;
}

function CompanyLogin() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        setError(errorData.message);
        return;
      }

      //on success
      const resData = await response.json();
      const token = resData.access_token;
      const user:User = resData.user;
      console.log(user);
      localStorage.setItem("token", token);

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());

      localStorage.setItem("access", JSON.stringify(user.access));

      localStorage.setItem("user", JSON.stringify(user));
      console.log()
      navigate(user.access.defaultStartPage);
      

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

        <form method="post" onSubmit={handleSubmit}>
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
        </form>
      </Container>
    </>
  );
}

export default CompanyLogin;



/* export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    login: data.get("login"),
    password: data.get("password"),
  };
  console.log(authData)
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
  const user:User = resData.user;
  console.log(user);
  localStorage.setItem("token", token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  localStorage.setItem("access", JSON.stringify(user.access));

  localStorage.setItem("user", JSON.stringify(user));
  
  return redirect(`${user.access.defaultStartPage}`);

} */

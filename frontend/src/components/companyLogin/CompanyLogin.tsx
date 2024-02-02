import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Input, Button, Heading, InputGroup, Stack, Alert, AlertIcon
} from '@chakra-ui/react';
import { isLogged } from '../../services/auth';
import { login } from './utils/login';
import { setDataAfterLogin } from './utils/setDataAfterLogin';
import { LoginResponse } from './Interfaces/loginResponse.interface';
import { storageGetUser } from '../../utils/localhostHandlers';


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
      const response: LoginResponse = await login(authData);
      const user = response.user;

      setDataAfterLogin(response);

      navigate(user.access.defaultStartPage);
      
    } catch (err:any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLogged()) {
      // user is already logged in, redirect to their defaultStartPage
      const user = storageGetUser();
      navigate(user.access.defaultStartPage);
    }
  }, []);

  return (
    <>

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


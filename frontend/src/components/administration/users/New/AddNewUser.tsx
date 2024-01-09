import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";

//list of roles
import { roles } from "../Utils/roles";
//post service
import { postNewUser } from "../Utils/postNewUser";


function AddNewUser() {

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Container mt="1rem" mb="1rem" centerContent>
      <Form method="post">
        <Stack minW="container.sm">
          <Input
            id="login"
            type="text"
            name="login"
            required
            placeholder="Login"
            variant="outline"
          />

          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Password"
            variant="outline"
          />

          <Input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            variant="outline"
          />

          <Input
            id="surname"
            type="text"
            name="surname"
            required
            placeholder="Surname"
            variant="outline"
          />

          <Select id="role" name="role" placeholder="Select Role">
          {roles.map((role:string) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>

          <Spacer />

          <Button type="submit" variant="solid" colorScheme="purple">
            ADD
          </Button>

          <Button
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            variant="outline"
            colorScheme="purple"
          >
            Cancel
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default AddNewUser;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();

  const authData = {
    login: data.get("login"),
    password: data.get("password"),
    name: data.get("name"),
    surname: data.get("surname"),
    role: data.get("role"),
  };
  
  try {
    const resData = await postNewUser(authData);
    console.log(resData)
    return redirect("/administration/users/" + resData)
  } catch (err) {
    return err;
  }
  

  
  
}

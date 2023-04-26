import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  Spacer,
  VStack,
  StackDivider,
  Stack,
} from "@chakra-ui/react";
import "./AddNewUser.css";

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
            <option value="Production">Production</option>
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
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
  //console.log(authData)
  //console.log('probuje dodac usera front');

  const response = await fetch("http://localhost:5000/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  //console.log(resData);

  //console.log(`wsio ok`)
  //redirect
  return redirect("/administration/users/" + resData);
}

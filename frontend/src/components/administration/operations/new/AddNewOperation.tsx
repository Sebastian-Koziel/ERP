import { Form, redirect, useNavigate, useNavigation, useRouteLoaderData } from "react-router-dom";
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



function AddNewOperation() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useRouteLoaderData("newOperation");
  
 console.log(data)
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }


  return (
    <Container mt="1rem" mb="1rem" centerContent>
      <Form method="post">
        <Stack minW="container.sm">
          <Input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            variant="outline"
          />
          
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

export default AddNewOperation;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");

  const authData = {
    name: data.get("name"), 
  };
  
  const response = await fetch("http://localhost:3000/operations/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  return redirect("/administration/operations");
  //return redirect("/administration/workspaces/" + resData);
}
 
export const newOperationLoader = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  const stages = await fetch("http://localhost:3000/stages", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const workSpaces = await fetch("http://localhost:3000/workspaces", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const [data1, data2] = await Promise.all([stages, workSpaces]);
  const consolidatedData = {
    stages: data1,
    workSpaces: data2
  };
  return consolidatedData;
};

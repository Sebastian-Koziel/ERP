import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Spacer,
  Stack,
} from "@chakra-ui/react";


function AddNewWorkspaceType() {

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
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            variant="outline"
          />

          <Input
            id="comment"
            type="text"
            name="comment"
            required
            placeholder="comment"
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

export default AddNewWorkspaceType;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");

  const authData = {
    name: data.get("name"),
    comment: data.get("comment"),
    
  };
  
  
  const response = await fetch("http://localhost:3000/workspace/types/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  
  return redirect("/administration/workspaces/types");
  //return redirect("/administration/workspaces/" + resData);
}


 


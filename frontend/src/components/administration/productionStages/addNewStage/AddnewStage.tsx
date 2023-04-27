import { Form } from "react-router-dom";
import "./AddNewStage.css";
import { Container, Input, Button, Stack } from "@chakra-ui/react";

function AddNewStage() {
  return (
    <Container p="5rem" centerContent>
      <Form method="post">
        <Stack direction="row" spacing={1}>
          <Input placeholder="Name" type="text" name="name" w="25rem" />
          <Button type="submit" variant="solid" colorScheme="purple">
            ADD
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default AddNewStage;

export async function action({ request, params }) {
  const data = await request.formData();
  console.log(`in action`);
  const eventData = {
    name: data.get("name"),
  };

  const response = await fetch("http://localhost:5000/stage/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
}

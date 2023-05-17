import { useRouteLoaderData } from "react-router-dom";
import "./EditStage.css";
import { Button, Container, Input, Stack } from "@chakra-ui/react";

function EditStage() {
  const data = useRouteLoaderData("stagesLoader");

  return (
    <Container p={4} centerContent>
      <Stack direction="row">
        <Input type="text" defaultValue={data ? data.name : ""} />
        {/* TO DO create function to change name of stage */}
        <Button variant="solid" colorScheme="purple">
          Save
        </Button>
      </Stack>
    </Container>
  );
}

export default EditStage;

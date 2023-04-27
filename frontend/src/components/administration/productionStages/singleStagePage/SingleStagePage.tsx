import { useRouteLoaderData, Link } from "react-router-dom";

import "./SingleStagePage.css";
import { Container, Heading, Button, Stack, Divider } from "@chakra-ui/react";

interface Stage {
  id: number;
  name: string;
}

interface MyLoaderProps {
  stageId: number;
}

function SingleStagePage() {
  const stage = useRouteLoaderData("stagesLoader");
  function startDeleteHandler() {
    const proceed = window.confirm("are ju siur?");

    if (proceed) {
      //powinna być osobny component na to
      //nie wiem jak dodac kilka akcji do 1 sciezki
      console.log(`gonna delete ${stage.id}`);
    }
  }

  return (
    <>
      <Container centerContent>
        <Stack direction="row" p={4}>
          <Heading>{stage.name}</Heading>
          <Divider orientation="vertical" />

          <Link to="edit">
            <Button variant="outline" colorScheme="purple">
              Edit
            </Button>
          </Link>
          <Button
            onClick={startDeleteHandler}
            variant="solid"
            colorScheme="red"
          >
            Delete
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default SingleStagePage;

export const singleStagesLoader = async ({
  params,
}: {
  params: MyLoaderProps;
}): Promise<Stage> => {
  const stageId = params.stageId;

  const response = await fetch("http://localhost:5000/url/" + stageId);

  const data = await response.json();
  return data;
};

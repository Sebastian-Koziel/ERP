import { Link } from "react-router-dom";
import "./ListStages.css";
import { Text, Flex, List, ListItem, Divider, Button } from "@chakra-ui/react";

function ListStages(stages: any) {
  stages = stages.stages;
  return (
    <Flex>
      <Text p="1rem">All Events</Text>
      <Divider orientation="vertical" />
      <List spacing={1} p="1rem">
        {stages.map((stage: any) => (
          <ListItem key={stage.id}>
            <Link to={stage.id.toString()}>
              <Button variant="outline" colorScheme="purple">
                {stage.name}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}

export default ListStages;

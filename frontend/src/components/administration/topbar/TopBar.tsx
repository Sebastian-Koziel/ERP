import { Form } from "react-router-dom";
import {
  Flex,
  Center,
  Button,
  Heading,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react";

function TopBar() {
  return (
    <section>
      <Flex
        w="100%"
        h="3.5rem"
        bg="purple.600"
        justify="space-between"
        wrap="wrap"
        gap="2"
      >
        <Center>
          <Box flexGrow="1" ml="1rem">
            <Heading color='aliceblue'>Statera</Heading>
          </Box>
        </Center>
        <Spacer />
        <Center>
          <Box>
            <>
              {/* 
                  TO DO 
                    Wklejenie nazwy użytkowika
                */}
              <Text color='aliceblue'>Username</Text>
            </>
          </Box>
        </Center>
        <Center>
          <Box>
            <Form action="/logout" method="post">
              <Button mr="0.5rem" type="submit" color='aliceblue' colorScheme="purple" variant='outline'>
                Logout
              </Button>
            </Form>
          </Box>
        </Center>
      </Flex>
    </section>
  );
}

export default TopBar;

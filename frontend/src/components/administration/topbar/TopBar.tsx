import { Form } from 'react-router-dom'
import { Flex, Center, Button, Heading, Text, Box, Spacer } from '@chakra-ui/react'

function TopBar() {
  
  return (
    <section>
        <Flex w="100%" h="3.5rem" bg="gray.300" justify='space-between' wrap="wrap" gap="2">
          <Center>
            <Box flexGrow="1" ml="1rem">
              <Heading>Statera</Heading> 
            </Box>
          </Center>
          <Spacer/>
          <Center>
            <Box>
              <>
                {/* 
                  TO DO 
                    Wklejenie nazwy użytkowika
                */}
                <Text>Username</Text>
              </>
            </Box>
          </Center>
          <Center>
            <Box>
              <Form action="/logout" method="post">
                <Button mr="1rem">Logout</Button>
              </Form>
            </Box>
          </Center>
      </Flex>
    </section>
  )
}

export default TopBar
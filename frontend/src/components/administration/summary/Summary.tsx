import "./Summary.css";
import { Container, Heading, Text, Divider } from "@chakra-ui/react";

function Summary() {
  return (
    <Container mt="2rem" mb="2rem">
      <Container centerContent>
        <Heading size="md" padding="1rem" color="purple.500">
          Main Page
        </Heading>
        <Divider />
        <Text mb="0.5rem"> Orders on time summary</Text>

        <Text mb="0.5rem">
          complaint summary
        </Text>
        <Text>
          Ogolnie rozne sekcje z informacjami ktore mozna wlaczac/wyl w
          ustawieniach wedlug zapotrzebowania
        </Text>
      </Container>
    </Container>
  );
}

export default Summary;

import { Box, Center, Text } from "@chakra-ui/react"

interface FetchErrorComponentProps {
    errors: string[] | string;
  }

const FetchErrorComponent: React.FC<FetchErrorComponentProps> = ({ errors }) => {
  //if its a single string, convert it to an array
  const errorMessages = Array.isArray(errors) ? errors : [errors];
  return (
    <Center flexDirection="row">
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="red.50">
        {errorMessages.map((error, index) => (
          <Text key={index} mb={4} color="red.800" fontSize="lg" fontWeight="semibold">
            An error occurred: {error}
          </Text>
        ))}
        <Text mb={6} color="gray.600">
          Please try refreshing the page, or if the problem persists, contact our support team.
        </Text>
      </Box>
    </Center>
  );
};

export default FetchErrorComponent
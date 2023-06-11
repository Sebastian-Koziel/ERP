
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Container,
} from "@chakra-ui/react";
import { Stage } from "../interfaces/Stage.interface";

function StagesList(stages: any) {
    stages = stages.stages;
  return (
    <>
      <Container centerContent minW="75%">
      <Button variant="solid" colorScheme="purple">
      <Link to='new'>Add new</Link>
      </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>stages List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {stages.map((stages: Stage) => (
                <Tr>
                  <Td>{stages.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={stages._id}>Edit</Link>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default StagesList;

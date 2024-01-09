
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
import { Operation } from "../Interfaces/Operations.interface";

function OperaionsList(operations: any) {
    operations = operations.operations;
  return (
    <>
      <Container centerContent minW="75%">
      <Button variant="solid" colorScheme="purple">
      <Link to='new'>Add new</Link>
      </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>operations List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {operations.map((operation: Operation, key: any) => (
                <Tr key={key}>
                  <Td>{operation.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={operation._id}>Edit</Link>
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

export default OperaionsList;

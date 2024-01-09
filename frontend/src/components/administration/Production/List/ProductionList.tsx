
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
import { OperationHandler } from "../Interfaces/operationHandler.interface";


function ProductionList(operations: any) {
    operations = operations.operations;
  return (
    <>
      <Container centerContent minW="75%">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Operations List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {operations.map((operation: OperationHandler) => (
                <Tr key={operation._id}>
                  <Td>{operation.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={operation._id}>Details</Link>
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

export default ProductionList;

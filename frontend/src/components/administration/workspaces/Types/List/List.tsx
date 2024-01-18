
import { Link } from "react-router-dom";
import { WorkspaceType } from "../../../workspaceTypes/Interfaces/WorkspaceType";
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

function WorkspacesTypesList(props: any) {
    const workspacesTypes = props.types;
    
  return (
    <>
      <Container centerContent minW="75%">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>WorkspaceType List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {workspacesTypes.map((WorkspaceType: WorkspaceType) => (
                <Tr key={WorkspaceType._id}>
                  <Td>{WorkspaceType.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={WorkspaceType._id}>Edit</Link>
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

export default WorkspacesTypesList;

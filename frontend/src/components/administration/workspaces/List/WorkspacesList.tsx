
import { Link } from "react-router-dom";
import { Workspace } from "../Interfaces/Workspace.interface";
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

function WorkspacesList(workspaces: any) {
  workspaces = workspaces.workspaces;
  return (
    <>
      <Container centerContent minW="75%">
      <Button variant="solid" colorScheme="purple">
      <Link to='new'>Add new</Link>
      </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Workspaces List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {workspaces.map((workspace: Workspace) => (
                <Tr key={workspace._id}>
                  <Td>{workspace.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={workspace._id}>Edit</Link>
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

export default WorkspacesList;

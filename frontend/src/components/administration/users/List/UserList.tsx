import "./UserList.css";

import { Link, useSubmit } from "react-router-dom";
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
import { User } from "../Interfaces/user.interface";

function UserList(props:any) {
  const submit = useSubmit();

  const users:User[] = props.users;

  return (
    <>
      <Container centerContent minW="75%">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Users List</TableCaption>
            <Thead>
              <Tr>
                <Th>Login</Th>
                <Th>Name</Th>
                <Th>Surname</Th>
                <Th>Role</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user: User) => (
                <Tr key={user._id}>
                  <Td>{user.login}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.surname}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={user._id}>Details</Link>
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

export default UserList;

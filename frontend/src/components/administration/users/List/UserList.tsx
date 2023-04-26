import './UserList.css'

import { Link, useSubmit } from "react-router-dom";
import { User } from "../Models/UserModels";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button
} from "@chakra-ui/react";

function UserList(users: any) {
  const submit = useSubmit();

  function startDeleteHandler(id: string) {
    const proceed = window.confirm("Siur?");

    if (proceed) {
      submit({ id }, { method: "delete" });
    }
  }
  users = users.users;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Users List</TableCaption>
          <Thead>
            <Tr>
              <Th>Login</Th>
              <Th>Password</Th>
              <Th>Role</Th>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
          {users.map((user: User) => (
              <Tr>
                <Td>{user.login}</Td>
                <Td className="hidenText">{user.password}</Td>
                <Td>{user.access.role}</Td>
                <Td>{user.name}</Td>
                <Td>{user.surname}</Td>
                <Td>
                  <Button variant='solid' colorScheme="purple">
                  <Link to={user._id}>show</Link>
                  </Button>
                </Td>
                <Td>
                  <Button
                  variant='solid'
                  colorScheme="red"
                    type="button"
                    onClick={() => startDeleteHandler(user._id)}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

     
      </>
   
  );
}

export default UserList;

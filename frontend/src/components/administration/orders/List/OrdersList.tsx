
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
import { Order } from "../Interfaces/Order.interface";

function OrderesList(orders: any) {
    orders = orders.orders;
  return (
    <>
      <Container centerContent minW="75%">
      <Button variant="solid" colorScheme="purple">
      <Link to='new'>Add new</Link>
      </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Products List</TableCaption>
            <Thead>
              <Tr>
                <Th>Number</Th>
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order: Order) => (
                <Tr key={order._id}>
                    <Td>{order.orderNo}</Td>
                    <Td>{order.name}</Td>
                    <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={order._id}>Edit</Link>
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

export default OrderesList;

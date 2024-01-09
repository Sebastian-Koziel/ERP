
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
import { Product } from "../Interfaces/Products.interface";

function ProductsList(products: any) {
    products = products.products;
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
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product: Product) => (
                <Tr key={product._id}>
                  <Td>{product.name}</Td>
                  <Td>
                    <Button variant="solid" colorScheme="purple">
                      <Link to={product._id}>Edit</Link>
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

export default ProductsList;

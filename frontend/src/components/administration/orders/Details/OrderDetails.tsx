import { Order } from "../Interfaces/Order.interface";
import { useLoaderData, Form } from "react-router-dom";
import {
    Container,
    Input,
    Button,
    Spacer, 
    Stack,
    Select,
  } from "@chakra-ui/react";
import { Product } from "../../products/Interfaces/Products.interface";
import { useState } from "react";
import { startOrder } from "../utils/postStartOrder";

function OrderDetailsRoot() {
  const order: any | Order = useLoaderData();
  console.log(order);
  const [pickedProducts, setPickedProducts] = useState(order.products);

  const startOrderHandler = async () => {
      try {
        await startOrder(order._id)
        console.log('order started')
      } catch (error) {
          return error
      }
  }

  return (
    <>
        <Container mt="1rem" mb="1rem" centerContent>
        <Button
            type="button"
            variant="outline"
            colorScheme="purple"
            onClick={startOrderHandler}
            >Start order</Button>
      <Form method="post">
        <Stack minW="container.sm">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            variant="outline"
            value={order.name}
          />
          
        <Input
            id="comment"
            type="text"
            name="comment"
            placeholder="comment"
            variant="outline"
            value={order.comment}
        />

        <Input
            id="orderNo"
            type="text"
            name="orderNo"
            placeholder="orderNo"
            variant="outline"
            value={order.orderNo}
        />

        <Input
            type="hidden"
            name="listOfProducts"
            value={JSON.stringify(pickedProducts)}
          
          />

        <div>
            Products:
        <ul>
            {pickedProducts.map((product:Product) => (
                <li key={Math.random()}>
                    {product.name} - {product.qty}
                </li>
            ))}
        </ul>
        </div>

          <Spacer />

          {/* <label htmlFor="stage">Pick a product:</label>
          <Select id="product_id" name="product_id" required>
            {productsList.map((product:Product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Select>
          <Input
            id="productQty"
            type="number"
            name="productQty"
            placeholder="qty"
            variant="outline"
            /> 
            <Button
            type="button"
            onClick={addProductHandler}
            variant="outline"
            colorScheme="purple"
            >Add product
            </Button> */}

          <button type="submit">
            Save
          </button>

          <Button
            type="button"
            variant="outline"
            colorScheme="purple"
          >
            Cancel
          </Button>
        </Stack>
      </Form>
      ZROBIC:
      naprawić formularz (validacja itp.),
      edycja tylko jezeli nie uruchomione,
      dodawanie usuwanie produktów jeżeli nie uruchomione,

      po uruchomieniu dodać jakieś okno gdzie jest dostepna lista operacji i można sledzić postep
    </Container>
    </>
  );
}

export default OrderDetailsRoot;

interface MyLoaderProps {
    orderId: string;
}

export const orderByIdLoader = async ({params,}: {params: MyLoaderProps;}): Promise<Order> => {
  const orderId = params.orderId;
  const token = localStorage.getItem("token");
  //console.log(`front probuje wbic na usera ${userId}`)

  const response = await fetch("http://localhost:3000/orders/" + orderId, {
    headers: {
      Authorization: "Bearer "+token
    }
  });

  const data = await response.json();

  return data;
};

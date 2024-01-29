import { useState } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useRouteLoaderData} from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Spacer, 
  Stack,
  Select,
  OrderedList
} from "@chakra-ui/react";

import { useInput } from "../../../../hooks/form/use-input";
import { addNewOrderFetch } from "../utils/newOrder";
import { NewOrder } from "../Interfaces/CreateOrder.interface";
import { Product } from "../../products/Interfaces/Product.interface";
import { getObjectById } from "../../../../utils/utils";


function AddNewOrder() {

  const dataFromFetching:any = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const productsList:any = useLoaderData();
  const isSubmitting = navigation.state === "submitting";

  const [pickedProducts, setPickedProducts] = useState([]);

  console.log(productsList)

  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    message: errorMessage
  } = useInput([{name: 'required'}], '');

    
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const cancelHandler = () => {
    navigate("..");
  }

  const addProductHandler = () => {
    const productIdElement = document.getElementById("product_id") as HTMLInputElement;
    const productQtyElement = document.getElementById("productQty")as HTMLInputElement;
  
    if (productIdElement && productQtyElement) {
      
        const isProductAlreadyPicked = pickedProducts.some(product => product.productType_id === productIdElement.value);

        if(isProductAlreadyPicked){
            alert('product already picked');
            return;
        }

      const product = JSON.parse(JSON.stringify(getObjectById(productsList, productIdElement.value)));
      const qty = Number(productQtyElement.value);
  
      product.qty = qty;
      product.productType_id = product._id;
      delete product._id;

      setPickedProducts((OldList)=>{
        let newList = JSON.parse(JSON.stringify(OldList));
        newList.push(product);
        return newList;
      })
    }
  };
  
  return (
     <>
    
    <Container mt="1rem" mb="1rem" centerContent>
      {dataFromFetching && dataFromFetching.status && <p>{dataFromFetching.message}</p>}
      <Form method="post">
        <Stack minW="container.sm">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            variant="outline"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <span>{errorMessage}</span>
          )}
          
        <Input
            id="comment"
            type="text"
            name="comment"
            placeholder="comment"
            variant="outline"
        />

        <Input
            id="orderNo"
            type="text"
            name="orderNo"
            placeholder="orderNo"
            variant="outline"
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

          <label htmlFor="stage">Pick a product:</label>
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
            </Button>
          <button type="submit" disabled={!formIsValid}>
            ADD
          </button> 

          <Button
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            variant="outline"
            colorScheme="purple"
          >
            Cancel
          </Button>
        </Stack>
      </Form>
      
    </Container>
    
    </>
  );
}

export default AddNewOrder;

export async function action({ request }: { request: Request }) {
  
  const data = await request.formData();
  
  const nameValue = data.get("name")
  const name: string = nameValue !== null ? nameValue.toString() : ""

  const commentValue = data.get("comment")
  const comment: string = commentValue !== null ? commentValue.toString() : ""

  const orderNoValue = data.get("orderNo")
  const orderNo: string = orderNoValue !== null ? orderNoValue.toString() : ""

  const order = {
    name: name,
    comment: comment,
    orderNo: orderNo,
    products: JSON.parse(data.get("listOfProducts"))
  };
  
  console.log(order);

  try {
    await addNewOrderFetch(order);
  } catch (err) {
    return err;
  }
  
  //const resData: string = await response.json();

  return redirect("/administration/orders");
  //return redirect("/administration/workspaces/" + resData);
}



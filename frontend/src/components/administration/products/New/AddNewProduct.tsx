import { useState } from "react";
import { Form, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData} from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Spacer, 
  Stack,
} from "@chakra-ui/react";

import { useInput } from "../../../../hooks/form/use-input";
import { addNewProductFetch } from "../utils/newProduct";
import DragAndDrop from "../DragAndDrop/DragAndDrop";





function AddNewProduct() {

  const dataFromFetching:any = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useRouteLoaderData("newProduct");
  

  //list of operations for product (drag and drop)
  const operationsForProduct = [
    {title:`group 1`, items:[]},   
  ]
  //handler of list of operations
  const [list, setList] = useState(operationsForProduct);

  
  
  const isSubmitting = navigation.state === "submitting";

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
            type="hidden"
            name="operationsForProduct"
            value={JSON.stringify(list)}
          
          />

        

          <Spacer />

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
      <DragAndDrop operations={data} list={list} setList={setList} />
    </Container>
    
    </>
  );
}

export default AddNewProduct;

export async function action({ request }: { request: Request }) {
  
  const data = await request.formData();
  
  const product = {
    name: data.get("name"),
    comment: data.get("comment"), 
    operations: JSON.parse(data.get("operationsForProduct"))[0].items 
  };

  console.log(product);

  try {
    await addNewProductFetch(product);
  } catch (err) {
    return err;
  }
  
  //const resData: string = await response.json();

  return redirect("/administration/products");
  //return redirect("/administration/workspaces/" + resData);
}


export const newProductLoader = async (): Promise<any> => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/operations", {
      headers: {
        Authorization: "Bearer "+token
      }
    });
    const data = await response.json();
    return data;
  };


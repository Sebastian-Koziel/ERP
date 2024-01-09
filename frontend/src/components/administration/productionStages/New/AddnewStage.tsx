import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useInput } from "../../../../hooks/form/use-input";



function AddNewStage() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  const {
      value: enteredName, 
      isValid: enteredNameIsValid,
      hasError: nameInputHasError, 
      valueChangeHandler: nameChangedHandler, 
      inputBlurHandler: nameBlurHandler,
      message: errorMessage
    } = useInput([{name: 'required'}],'');

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  

  return (
    <>
    <Container mt="1rem" mb="1rem" centerContent>
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
    </Container>
    </>
  );
}

export default AddNewStage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");

  const authData = {
    name: data.get("name"),
    comment: data.get("comment"),
    
  };
  
  const response = await fetch("http://localhost:3000/stages/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  
  return redirect("/administration/stages");
  //return redirect("/administration/workspaces/" + resData);
}
 


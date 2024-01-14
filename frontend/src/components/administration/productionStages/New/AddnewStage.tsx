import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useInput } from "../../../../hooks/form/use-input";
import { addNewStage } from "../utils/addNewStage";



function AddNewStage() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handling submit
  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
  const newStagedata = {
    name: formData.get("stageName") as string,
    comment: formData.get("stageComment") as string,
  };
  
    try {
      const response = await addNewStage(newStagedata);
      toast({
        title: "Stage added",
        description: "Stage has been successfully added",
        status: "success",
        duration: 5000,
        position: 'top',
        isClosable: true
      });
      navigate("..");
    } catch (error:any) {
      toast({
        title: "Error.",
        description: error.message || "Something went wrong with adding this stage",
        status: "error",
        position: 'top',
        duration: 5000,
        isClosable: true
      });
    }
  };

  //input handlers
  const { 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    message: nameErrorMessage
  } = useInput([{name: 'required'}], '');

  const { 
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError, 
    valueChangeHandler: commentChangedHandler, 
    inputBlurHandler: commentBlurHandler,
    message: commentErrorMessage
  } = useInput([], '');

 
//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid) {
  formIsValid = true;
}

  return (
    <>
    <Container mt="1rem" mb="1rem" centerContent>
      <Box>
        <Heading>Adding new stage</Heading>
      </Box>
      <Form onSubmit={handleSubmit}>

      <FormControl isRequired isInvalid={nameInputHasError}>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                id="stageName"
                type="text"
                name="stageName"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
              />
            {!nameErrorMessage? (
                <FormHelperText>
                enter name
                </FormHelperText>
                ) : (
                <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
                )}
       
      </FormControl>

      <FormControl isInvalid={commentInputHasError}>
            <FormLabel>
              Comment:
            </FormLabel>
              <Input
                id="stageComment"
                type="text"
                name="stageComment"
                onChange={commentChangedHandler}
                onBlur={commentBlurHandler}
              />
            {!commentInputHasError? (
                <FormHelperText>
                enter comment
                </FormHelperText>
                ) : (
                <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                )}
       
      </FormControl>

          <Button 
          type="submit" 
          isDisabled = {!formIsValid}
          >
            ADD
          </Button>

          <Button
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            variant="outline"
            colorScheme="purple"
          >
            Cancel
          </Button>
        
      </Form>
    </Container>
    </>
  );
}

export default AddNewStage;


/* export async function action({ request }: { request: Request }) {
  
  const data = await request.formData();
  
  const newStagedata = {
    name: data.get("stageName"),
    comment: data.get("stageComment"),
  };
  
  try {
    const response = await addNewStage(newStagedata);
    
    
  } catch (err: any) {
    
  }
} */

  /* const response = await fetch("http://localhost:3000/stages/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  
  return redirect("/administration/stages"); */
  //return redirect("/administration/workspaces/" + resData);

 


import { useRouteLoaderData, Link, Form, Navigate, useNavigate } from "react-router-dom";
import { Container, Heading, Button, Stack, FormControl, FormLabel, Input, Box, FormErrorMessage, FormHelperText, Textarea, useToast } from "@chakra-ui/react";
import { Stage, updateStageData } from "../interfaces/Stage.interface";
import { useState } from "react";
import { useInput } from "../../../../hooks/form/use-input";
import { updateStage } from "../utils/updateStage";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import useConfirmationDialog from "../../../../hooks/AlertDialog";
import { deleteStage } from "../utils/deleteStage";

interface ErrorResponse {
  error: string;
}
type RouteLoaderData = Stage | ErrorResponse;

function SingleStagePage() {
  const navigate = useNavigate();
//handle error from router fetching
  const routeData = useRouteLoaderData("singleStageLoader") as RouteLoaderData;
  
  if('error' in routeData){
    return (
      <FetchErrorComponent errors={routeData.error}/>
    );
  }

//if there is no error from router fetching

  // data set up
  const [stage, setStage] = useState(routeData);
  const stageInUse = stage.usedIn.length ? true : false;
  //for error and confirmation displaying
  const toast = useToast();

  //input handlers
  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    cancelEdit: nameCancelEdit,
    message: nameErrorMessage
  } = useInput([{name: 'required'}], stage.name);

  const {
    value: enteredComment, 
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError, 
    valueChangeHandler: commentChangedHandler, 
    inputBlurHandler: commentBlurHandler,
    cancelEdit: commentCancelEdit,
    message: commentErrorMessage
  } = useInput([], stage.comment);

 
//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid) {
  formIsValid = true;
}

//edit handle
//set up state
const [editing, setEditing] = useState(false);

const editButtonHandler = () =>{
  //cancel editing
  if(editing){
    nameCancelEdit();
    commentCancelEdit();
  }
  //go into editing if not editing
  setEditing(!editing);
}

//saving changes after editing
const submitFormHandler = async () => {
  //set new data
  const data: updateStageData = {
    id: stage._id,
    attr : {
      name: enteredName,
      comment: enteredComment,
    }
  }
  try {
    const response = await updateStage(data);
    toast({
      title: "Stage updated",
      description: "Stage has been successfully updated",
      status: "success",
      duration: 5000,
      isClosable: true
    });
    //fix state without fetching
    setStage({...stage, ...data.attr});
    //turn off editing
    setEditing(!editing);
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with updating this stage",
      status: "error",
      duration: 5000,
      isClosable: true
    });
  }
}

//delete handler
const { getConfirmation, ConfirmationDialog } = useConfirmationDialog();
const startDeleteHandler = () => {
//if product in use - you cant delete
if(stageInUse){
    toast({
      title: "Product in use!",
      description: "Product is already in use - you can`t delete it",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    return
  }
  else{
    //double check if to proceed
    getConfirmation(
      async ()=>{
        try {
          const response = await deleteStage(stage._id);
          toast({
            title: "Product deleted",
            description: "Product has been successfully deleted",
            status: "success",
            duration: 5000,
            position: 'top',
            isClosable: true
          });
          //nav awai
          navigate("..");
        } catch (err: any) {
          toast({
            title: "Error.",
            description: err.message || "Something went wrong with deleting this product",
            status: "error",
            duration: 5000,
            position: 'top',
            isClosable: true
          });
        }
      }
    )
  }
}

  return (
    <>
      <Container centerContent>
        <Stack direction="row" p={4}>
          <Heading>{stage.name}</Heading>

            <Button 
            onClick={editButtonHandler}
            variant="outline" 
            colorScheme="purple">
              {!editing ? 'Edit' : 'Cancel'}
            </Button>

          {editing && 
          (<Button 
            isDisabled = {!formIsValid} 
            onClick={submitFormHandler}>
              Save changes
            </Button>
          )}
          
          <Button
            onClick={startDeleteHandler}
            variant="solid"
            colorScheme="red"
          >
            Delete
          </Button>

        </Stack>
        <Box>
        <Form>
          <FormControl isInvalid={nameInputHasError}>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                id="stageName"
                type="text"
                name="stageName"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                readOnly={!editing}
              />

                {!nameInputHasError && editing ? (
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
              <Textarea
                id="stageComment"
                name="stageComment"
                onChange={commentChangedHandler}
                onBlur={commentBlurHandler}
                value={enteredComment}
                readOnly={!editing}
              />
                {!commentInputHasError && editing ? (
                <FormHelperText>
                enter comment
                </FormHelperText>
                ) : (
                <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                )}
          </FormControl>

        </Form>
        </Box>

        <Box mt="10px">
          <Link to='..'>
            <Button>Go back</Button>
          </Link>
        </Box>
      <ConfirmationDialog 
        title="Delete product" 
        message="Are you sure you want to delete this product? You can't undo this action afterwards." 
    />
      </Container>
    </>
  );
}

export default SingleStagePage;

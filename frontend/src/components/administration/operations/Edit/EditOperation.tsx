import { Form, redirect, useNavigate, useNavigation, useLoaderData } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  useToast,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";

import { FetchError} from "../Utils/newOperationLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { useInput } from "../../../../hooks/form/use-input";
import { useSelect } from "../../../../hooks/form/use-select";
import { useState } from "react";
import { editperationConsolidatedData } from "../Utils/editOperationLoader";
import { UpdateoperationData } from "../Interfaces/UpdateOperation.interface";
import { updateOperation } from "../Utils/updateOperation";
import useConfirmationDialog from "../../../../hooks/AlertDialog";
import { deleteOperation } from "../Utils/deleteOperation";


function EditOperationComponent() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as editperationConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { workspaceTypes, operation } = routeData;
  // Check for errors within consolidated data
  if ('error' in workspaceTypes || 'error' in operation) {
    // Handle errors within consolidated data
    const errors = [
      'Error in workspaceTypes: ' + (workspaceTypes as FetchError).error,
      'Error in operartion: ' + (operation as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }


const [operationToBeEdited, setOperationToBeEdited] = useState(operation);
//check if product is in use in orders
const operationInUse = operationToBeEdited.usedIn.length ? true : false;

//edit handle
//set up state
const [editing, setEditing] = useState(false);

const editButtonHandler = () =>{
  //cancel editing
  if(editing){
    nameCancelEdit();
    commentCancelEdit();
    workspaceTypeCancelEdit();
  }
  if(!operationInUse){
  //go into editing if not editing
  setEditing(!editing);
  }
    else{
    toast({
        title: "operation in use!",
        description: "Operation is already in use - you can`t edit it",
        status: "error",
        duration: 5000,
        position: 'top',
        isClosable: true
    });
    }
}

//saving changes after editing
const submitFormHandler = async () => {
  //set new data
  const data: UpdateoperationData = {
    id: operationToBeEdited._id,
    attr : {
      name: enteredName,
      comment: enteredComment,
      workSpaceTypeId: enteredWorkspaceType
    }
  }
  try {
    const response = await updateOperation(data);
    toast({
      title: "Workspace updated",
      description: "operation has been successfully updated",
      status: "success",
      duration: 5000,
      isClosable: true
    });
    //fix state without fetching
    setOperationToBeEdited({...operation, ...data.attr});
    //turn off editing
    setEditing(!editing);
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with updating this operation",
      status: "error",
      duration: 5000,
      isClosable: true
    });
  }
}

//input handlers
const {
  value: enteredName, 
  isValid: enteredNameIsValid,
  hasError: nameInputHasError, 
  valueChangeHandler: nameChangedHandler, 
  inputBlurHandler: nameBlurHandler,
  message: nameErrorMessage,
  cancelEdit: nameCancelEdit,
} = useInput([{name: 'required'}], operationToBeEdited.name);

const {
  value: enteredComment, 
  isValid: enteredCommentIsValid,
  hasError: commentInputHasError, 
  valueChangeHandler: commentChangedHandler, 
  inputBlurHandler: commentBlurHandler,
  message: commentErrorMessage,
  cancelEdit: commentCancelEdit,
} = useInput([], operationToBeEdited.comment);


const {
  value: enteredWorkspaceType, 
  isValid: enteredWorkspaceTypeIsValid,
  hasError: workSpaceTypeInputHasError, 
  valueChangeHandler: workSpaceTypeChangedHandler, 
  inputBlurHandler: workSpaceTypeBlurHandler,
  generateOptions: workSpaceTypeGenerateOptions,
  message: workSpaceTypeErrorMessage,
  cancelEdit: workspaceTypeCancelEdit,
} = useSelect(workspaceTypes,[], operationToBeEdited.workSpaceTypeId);

//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid && enteredWorkspaceTypeIsValid) {
  formIsValid = true;
}
//delete handler
const { getConfirmation, ConfirmationDialog } = useConfirmationDialog();
const startDeleteHandler = () => {
//if product in use - you cant delete
if(operationInUse){
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
          const response = await deleteOperation(operationToBeEdited._id);
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
      <Container mt="1rem" mb="1rem" centerContent>
      <Box>
        <Form onSubmit={submitFormHandler}>
          <FormControl isInvalid={nameInputHasError} isRequired>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                id="operationName"
                type="text"
                name="operationName"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                readOnly={!editing}
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
        <Textarea
          id="operationComment"
          name="operationComment"
          onChange={commentChangedHandler}
          onBlur={commentBlurHandler}
          value={enteredComment}
          readOnly={!editing}
        />
                {!commentInputHasError? (
                <FormHelperText>
                enter name
                </FormHelperText>
                ) : (
                <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl isRequired>
      <FormLabel>Workspace type for this operation</FormLabel>
          <Select 
            id="workspacetype"
            name="workspacetype" 
            value={enteredWorkspaceType}
            onChange={workSpaceTypeChangedHandler}
            onBlur={workSpaceTypeBlurHandler}
            disabled={!editing}
            >
          {workSpaceTypeGenerateOptions()}   
          </Select>
          {!workSpaceTypeInputHasError? (
                <FormHelperText>
                Pick a workspace type
                </FormHelperText>
                ) : (
                <FormErrorMessage>{workSpaceTypeErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
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
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            variant="outline"
            colorScheme="purple"
          >
            Go back
    </Button>
    <Button
      onClick={startDeleteHandler}
      variant="solid"
      colorScheme="red"
    >
      Delete
    </Button>
    </Form>
    </Box>
    <ConfirmationDialog 
        title="Delete product" 
        message="Are you sure you want to delete this product? You can't undo this action afterwards." 
    />
    </Container>
    </>
  );
}

export default EditOperationComponent;


 


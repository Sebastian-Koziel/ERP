import { Form, redirect, useNavigate, useNavigation, useLoaderData } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  Spacer,
  Stack,
  useToast,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";

import { WorkspaceType } from "../../workspaceTypes/Interfaces/WorkspaceType";
import { FetchError, newOperationConsolidatedData } from "../Utils/newOperationLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { addNewOperationFetcher } from "../Utils/addNewOperation";
import { useInput } from "../../../../hooks/form/use-input";
import { useSelect } from "../../../../hooks/form/use-select";
import { CreateOperation } from "../Interfaces/CreateOperation.interface";


function AddNewOperation() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as newOperationConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { workspaceTypes } = routeData;
  // Check for errors within consolidated data
  if ('error' in workspaceTypes) {
    // Handle errors within consolidated data
    const errors = [
      'Error in workspaceTypes: ' + (workspaceTypes as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }

  //handling submit
const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  
const timePerPiece: number | null = formData.get("timePerUnit") as number | null;
  if(!timePerPiece){
    throw new Error(`error`)
  }

const newOperationData:CreateOperation = {
  name: formData.get("operationName") as string, 
  comment: formData.get("operationComment")as string,
  workSpaceTypeId: formData.get("workspacetype")as string,
  timePerPiece: timePerPiece
};

  try {
    const response = await addNewOperationFetcher(newOperationData);
    toast({
      title: "Operation added",
      description: "Operation has been successfully added",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    navigate("..");
  } catch (error:any) {
    toast({
      title: "Error.",
      description: error.message || "Something went wrong with adding this operation",
      status: "error",
      position: 'top',
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
  message: nameErrorMessage
} = useInput([{name: 'required'}], '');

const {
  value: enteredComment, 
  isValid: enteredCommentIsValid,
  hasError: commentInputHasError, 
  valueChangeHandler: commentChangedHandler, 
  inputBlurHandler: commentBlurHandler,
  message: commentErrorMessage
} = useInput([], '');


const {
  value: enteredWorkspaceType, 
  isValid: enteredWorkspaceTypeIsValid,
  hasError: workSpaceTypeInputHasError, 
  valueChangeHandler: workSpaceTypeChangedHandler, 
  inputBlurHandler: workSpaceTypeBlurHandler,
  generateOptions: workSpaceTypeGenerateOptions,
  message: workSpaceTypeErrorMessage
} = useSelect(workspaceTypes,[], '');

const { 
  value: enteredTimePerUnit,
  isValid: enteredTimePerUnitIsValid,
  hasError: timePerUnitInputHasError, 
  valueChangeHandler: timePerUnitChangedHandler, 
  inputBlurHandler: timePerUnitBlurHandler,
  message: timePerUnitErrorMessage,
  reset: timePerUnitReset
} = useInput([{name: 'required'}], '');

//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid && enteredWorkspaceTypeIsValid && enteredTimePerUnitIsValid) {
  formIsValid = true;
}


  return (
    <>
      <Container mt="1rem" mb="1rem" centerContent>
      <Box>
        <Form onSubmit={handleSubmit}>
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
            placeholder="Select workspace type"
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
    <FormControl isRequired>
    <FormLabel>Time per piece</FormLabel>
    <Input
            id="timePerUnit"
            type="number"
            name="timePerUnit"
            onChange={timePerUnitChangedHandler}
            onBlur={timePerUnitBlurHandler}
            value={enteredTimePerUnit}
            
          />
          {!timePerUnitInputHasError? (
                <FormHelperText>
                Please provide a time for one piece in seconds
                </FormHelperText>
                ) : (
                <FormErrorMessage>{timePerUnitErrorMessage}</FormErrorMessage>
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
    </Box>
    </Container>
    </>
  );
}

export default AddNewOperation;


 


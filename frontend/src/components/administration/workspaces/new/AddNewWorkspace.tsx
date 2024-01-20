import { Form, useNavigate, useNavigation, useLoaderData } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  useToast,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import { useInput } from "../../../../hooks/form/use-input";
import { useSelect } from "../../../../hooks/form/use-select";
import { ConsolidatedData, FetchError } from "../Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { addNewWorkspace } from "../Utils/addNewWorkspace";



function AddNewWorkspace() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handling fetching
  const routeData = useLoaderData() as ConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    // Handle fetch errors
    return <FetchErrorComponent errors={routeData.error} />;
  }
  
  // Destructure data from consolidatedData
  const { stages, workspaceTypes} = routeData;
  
  // Check for errors within consolidated data
  if ('error' in stages || 'error' in workspaceTypes) {
    // Handle errors within consolidated data
    const errors = [
      'Error in stages: ' + (stages as FetchError).error,
      'Error in workspaceTypes: ' + (workspaceTypes as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }

//handling submit
const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  
const newStagedata = {
  name: formData.get("workspaceName") as string,
  comment: formData.get("workspaceComment") as string,
  stage_id: formData.get("stage") as string,
  workspaceType_id: formData.get("workspacetype") as string,
};

  try {
    const response = await addNewWorkspace(newStagedata);
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
    value: enteredStage, 
    isValid: enteredStageIsValid,
    hasError: stageInputHasError, 
    valueChangeHandler: stageChangedHandler, 
    inputBlurHandler: stageBlurHandler,
    generateOptions: stageGenerateOptions,
    message: stageErrorMessage
  } = useSelect(stages,[], '');

  const {
    value: enteredWorkspaceType, 
    isValid: enteredWorkspaceTypeIsValid,
    hasError: workSpaceTypeInputHasError, 
    valueChangeHandler: workSpaceTypeChangedHandler, 
    inputBlurHandler: workSpaceTypeBlurHandler,
    generateOptions: workSpaceTypeGenerateOptions,
    message: workSpaceTypeErrorMessage
  } = useSelect(workspaceTypes,[], '');

//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid && enteredStageIsValid && enteredWorkspaceTypeIsValid) {
  formIsValid = true;
}

  return (
    <Container mt="1rem" mb="1rem" centerContent>
      <Box>
        <Form onSubmit={handleSubmit}>
          <FormControl isInvalid={nameInputHasError}>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                id="workspaceName"
                type="text"
                name="workspaceName"
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
          id="workspaceComment"
          name="workspaceComment"
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

    <FormControl>
      <FormLabel>Stage for this workspace</FormLabel>
          <Select 
            id="stage"
            name="stage" 
            value={enteredStage}
            onChange={stageChangedHandler}
            onBlur={stageBlurHandler}
            >
          {stageGenerateOptions()}   
          </Select>
          {!stageInputHasError? (
                <FormHelperText>
                Pick a stage for this workspace
                </FormHelperText>
                ) : (
                <FormErrorMessage>{stageErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl>
      <FormLabel>Workspace type for this workspace</FormLabel>
          <Select 
            id="workspacetype"
            name="workspacetype" 
            value={enteredWorkspaceType}
            onChange={workSpaceTypeChangedHandler}
            onBlur={workSpaceTypeBlurHandler}
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
  );
}

export default AddNewWorkspace;




 


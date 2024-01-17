import { useRouteLoaderData, Link, Form, useParams } from "react-router-dom";
import { Container, Heading, Button, Stack, FormControl, FormLabel, Input, Box, FormErrorMessage, FormHelperText, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInput } from "../../../../hooks/form/use-input";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { checkForErrors, fetchMultipleResources } from "../../../../utils/fetchMultipleResources";
import { getSafe } from "../../../../utils/getSafeForTS";
import { Workspace } from "../Interfaces/Workspace.interface";
import { updateStageData } from "../../productionStages/interfaces/Stage.interface";
import { updateStage } from "../../productionStages/utils/updateStage";

function SingleWorkspacePage() {
    const params = useParams();
    const workspace_id = params.workspaceId;

    const routeData = useRouteLoaderData("workspaceDetails") as ReturnType<typeof fetchMultipleResources>;
    
    //pleasing TS
    const stages = getSafe(routeData, 'stages', []);
    const workspaceTypes = getSafe(routeData, 'workspaceTypes', []);
    const workspaces = getSafe<Workspace[]>(routeData, 'workspaces', []);

    //checking if we have any errors in routeData
    const errors = checkForErrors(routeData);

    //if so display error
    if (errors.length > 0) {
        return <FetchErrorComponent errors={errors} />;
    }
    
    //if there is no error from router fetching

  // data set up
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    // Find the workspace that matches the workspace_id
    const foundWorkspace = workspaces.find(ws => ws._id === workspace_id);
    if(foundWorkspace){
    setWorkspace(foundWorkspace);
    }
}, [workspaces, workspace_id]);
  console.log(workspace)
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
  } = useInput([{name: 'required'}], workspace.name);

  const {
    value: enteredComment, 
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError, 
    valueChangeHandler: commentChangedHandler, 
    inputBlurHandler: commentBlurHandler,
    cancelEdit: commentCancelEdit,
    message: commentErrorMessage
  } = useInput([], workspace.comment);

 
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
    id: workspace._id,
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
    setWorkspace({...workspace, ...data.attr});
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


  function startDeleteHandler() {
    const proceed = window.confirm("are ju siur?");

    if (proceed) {
      //powinna być osobny component na to
      //nie wiem jak dodac kilka akcji do 1 sciezki
      console.log(`gonna delete ${workspace._id}`);
    }
  }

return (
  <Container centerContent>
  <Stack direction="row" p={4}>
    <Heading>{workspace.name}</Heading>

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

</Container>
  );

            }

export default SingleWorkspacePage;
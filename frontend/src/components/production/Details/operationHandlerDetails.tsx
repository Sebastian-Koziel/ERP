import { useLoaderData, useNavigate} from "react-router-dom";
import { startJobData } from "../interfaces/startJobData.interface";
import { updateOperationHandler } from "../Utils/updateOperationHandler";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { operationHandlerDetailsConsolidatedData } from "../Utils/operationHandlerDetailsLoader";
import { FetchError } from "../Utils/singleStageLoader";
import FetchErrorComponent from "../../errorHandling/FetchErrorComponent";
import { finishJobData } from "../interfaces/finishJobData.interface";
import { finishOperationHandlerPost } from "../Utils/finishOperationHandler";


export const OperationHandlerDetails: React.FC = () => {
    
    const toast = useToast();
    const navigate = useNavigate();

    //handle fetching
  const routeData = useLoaderData() as operationHandlerDetailsConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { operationHandler } = routeData;
  // Check for errors within consolidated data
  if ('error' in operationHandler) {
    // Handle errors within consolidated data
    const errors = [
      'Error in operationHandler: ' + (operationHandler as FetchError).error,
      
    ];
    return <FetchErrorComponent errors={errors} />;
  }

    const finishJobHandler = () => {
        
    }

const startJobButtonHandler = async () =>{
      //set data
  const data: startJobData = {
    id: operationHandler._id,
    attr : {
      startedAt: Date.now(),
      inProgress: true
    }
  }
  try {
    const response = await updateOperationHandler(data);
    toast({
      title: "Success",
      description: "job started",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with starting this job",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  }
}

const finishJobButtonHandler = async () =>{
  //set data
const data: finishJobData = {
id: operationHandler._id,
time: 4444,
qty: 40
}
try {
const response = await finishOperationHandlerPost(data);
toast({
  title: "Success",
  description: "job finished",
  status: "success",
  duration: 5000,
  position: 'top',
  isClosable: true
});
navigate("..");
} catch (err: any) {
toast({
  title: "Error.",
  description: err.message || "Something went wrong with finishing this job",
  status: "error",
  duration: 5000,
  position: 'top',
  isClosable: true
});
}
}

    const goBackHandler = () => {
        navigate("..");
    }

    return (
      <>
      <Box>
        <Heading as="h2" size="lg">
          {operationHandler.name}
        </Heading>
        <Text>Operation Comment: </Text>
        <Text>Qty to Do: {operationHandler.totalQty}</Text>
        {operationHandler.inProgress ? (
          <Button m="10px" onClick={finishJobButtonHandler}>Finish Job</Button>
        ) : (
          <Button m="10px" onClick={startJobButtonHandler}>Start Job</Button>
        )}
        <Button onClick={goBackHandler}>Go Back to List</Button>
      </Box>
    </>
    )

}



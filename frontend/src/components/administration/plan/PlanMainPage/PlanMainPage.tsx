import { useState } from "react";
import { Form, useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import { 
  useToast,
} from "@chakra-ui/react";


import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { planMainPageConsolidatedData } from "../Utils/planMainPageLoader";


function PlanMainPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as planMainPageConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { operationHandlers, workspaces } = routeData;
  // Check for errors within consolidated data
  if ('error' in operationHandlers || 'error' in workspaces) {
    // Handle errors within consolidated data
    const errors = [
      'Error in stages: ' + (operationHandlers as FetchError).error,
      'Error in workspaceTypes: ' + (workspaces as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }
  return (
    <>
    plan
    </>
  )
}



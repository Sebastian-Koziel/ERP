import { useRouteLoaderData, Link, Form } from "react-router-dom";
import { Container, Heading, Button, Stack, FormControl, FormLabel, Input, Box, FormErrorMessage, FormHelperText, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInput } from "../../../../hooks/form/use-input";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { checkForErrors, fetchMultipleResources } from "../../../../utils/fetchMultipleResources";
import { getSafe } from "../../../../utils/getSafeForTS";
import { Workspace } from "../Interfaces/Workspace.interface";

interface ErrorResponse {
    error: string;
  }
  type RouteLoaderData = Workspace | ErrorResponse;

function SingleWorkspacePage() {
// State for data and loading/error states
const [data, setData] = useState({ stages: [], workspaceTypes: [] });
const [fetchError, setFetchError] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchMultipleResources(['stages', 'workspaceTypes']);
        setData(fetchedData);
      } catch (error) {
        setFetchError(error.message || "Error fetching data");
      }
    }

    fetchData();
  }, []);

//get our workspace from RR loader
const workspace = useRouteLoaderData('singleWorkspaceLoader') as RouteLoaderData;
//check if there is no error
if('error' in workspace){
    return (
      <FetchErrorComponent errors={workspace.error}/>
    );
  }

//checking if we have any errors in routeData
const errors = checkForErrors(data);

//if so display error
if (errors.length > 0) {
  return <FetchErrorComponent errors={errors} />;
}

//extract data nicely for TS
const stages = getSafe(data, 'stages', []);
const workspaceTypes = getSafe(data, 'workspaceTypes', []);

console.log(workspaceTypes);
console.log(stages);
console.log(workspace);
return (
    <Container mt="1rem" mb="1rem" centerContent>
      fdsfdsf
    </Container>
  );

            }

export default SingleWorkspacePage;
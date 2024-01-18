import { useLoaderData, Link } from "react-router-dom";

import { WorkspaceType } from "../../../workspaceTypes/Interfaces/WorkspaceType";
import WorkspacesTypesList from "../List/List";
import {
  Container,
  Button,
  
} from "@chakra-ui/react";
function WorkspaceTypesListPage() {
  const workspaceTypes = useLoaderData();
  return (
    <>
    <Container mt="1rem" mb="1rem" centerContent>
    <Button variant="solid" colorScheme="purple">
      <Link to='new'>Add new</Link>
    </Button>
  <WorkspacesTypesList types={workspaceTypes} />
  </Container>
  </>
  )
}

export default WorkspaceTypesListPage;



export const workspaceTypesLoader = async (): Promise<WorkspaceType[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/workspace/types", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};


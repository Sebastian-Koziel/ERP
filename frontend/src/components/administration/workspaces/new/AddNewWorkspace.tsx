import { Form, redirect, useNavigate, useNavigation, useLoaderData } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";

import { Stage } from "../../productionStages/interfaces/Stage.interface";
import { WorkspaceType } from "../Types/Interfaces/WorkspaceType";



function AddNewWorkspace() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const fetchData:any = useLoaderData();

  const stages = fetchData.stages;
  const workSpaceTypes = fetchData.workSpaceTypes;
 

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Container mt="1rem" mb="1rem" centerContent>
      <Form method="post">
        <Stack minW="container.sm">
          <Input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            variant="outline"
          />

          <Input
            id="comment"
            type="text"
            name="comment"
            required
            placeholder="comment"
            variant="outline"
          />

          <label htmlFor="stage">Pick a stage for this work space:</label>
          <Select id="stage_id" name="stage_id" required>
            {stages.map((stage:Stage) => (
              <option key={stage._id} value={stage._id}>
                {stage.name}
              </option>
            ))}
          </Select>

          <label htmlFor="stage">Pick a type of workspace</label>
          <Select id="workspaceType_id" name="workspaceType_id" required>
            {workSpaceTypes.map((type:WorkspaceType) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </Select>

          <Spacer />

          <Button type="submit" variant="solid" colorScheme="purple">
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
        </Stack>
      </Form>
    </Container>
  );
}

export default AddNewWorkspace;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");

  const authData = {
    name: data.get("name"),
    comment: data.get("comment"),

    stage_id: data.get("stage_id"),
    workspaceType_id: data.get("workspaceType_id")
    
  };
  console.log(authData);
  
  const response = await fetch("http://localhost:3000/workspaces/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  const resData: string = await response.json();

  
  return redirect("/administration/workspaces");
  //return redirect("/administration/workspaces/" + resData);
}

export const newWorkspaceLoader = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  const stages = await fetch("http://localhost:3000/stages", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const workSpaceTypes = await fetch("http://localhost:3000/workspace/types", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const [data1, data2] = await Promise.all([stages, workSpaceTypes]);
  const consolidatedData = {
    stages: data1,
    workSpaceTypes: data2
  };
  return consolidatedData;
};
 


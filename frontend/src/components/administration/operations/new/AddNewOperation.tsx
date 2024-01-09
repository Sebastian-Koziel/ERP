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
import { storageGetToken } from "../../../../utils/localhostHandlers";
import { WorkspaceType } from "../../workspaces/Types/Interfaces/WorkspaceType";
import { CreateOperation } from "../Interfaces/CreateOperation.interface";


function AddNewOperation() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const fetchedData:any = useLoaderData();
  const workspaceTypes = fetchedData.workSpaceTypes;
  const stages = fetchedData.stages;
  
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
            placeholder="comment"
            variant="outline"
          />

          <label htmlFor="workspaceType_id">Main work space type for this operation:</label>
          <Select id="workspaceType_id" name="workspaceType_id" required>
            <option value="" disabled>Pick a stage for this operation</option>
            {workspaceTypes.map((type:WorkspaceType) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </Select>

          <label htmlFor="workspaceType_id">Stage for this operation:</label>
          <Select id="stage_id" name="stage_id" required>
            <option value="" disabled>Pick a stage for this operation</option>
            {stages.map((type:Stage) => (
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

export default AddNewOperation;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const token = localStorage.getItem("token");
  
  const authData = {
    name: data.get("name"), 
    comment: data.get("comment"),
    workSpace_type: data.get("workspaceType_id"),
    stage_id: data.get('stage_id')
  };
  
  const response = await fetch("http://localhost:3000/operations/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(authData),
  });

  return redirect("/administration/operations");
  //return redirect("/administration/workspaces/" + resData);
}
 
export const newOperationLoader = async (): Promise<any> => {

  const token = storageGetToken();

  const stages = await fetch("http://localhost:3000/stages", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const workSpaces = await fetch("http://localhost:3000/workspace/types", {
    headers: {
      Authorization: "Bearer "+token
    }
  }).then(response => response.json());

  const [data1, data2] = await Promise.all([stages, workSpaces]);
  const consolidatedData = {
    stages: data1,
    workSpaceTypes: data2
  };
  return consolidatedData;
};

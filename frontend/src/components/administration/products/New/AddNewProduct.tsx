import { useState } from "react";
import { Form, useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import { 
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";


import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { newProductConsolidatedData } from "../utils/newProductLoader";
import VisNetwork from "../../../../hooks/form/vis-network";
import { OperationComponentAddition } from "./AddOperationComponent";
import { OperationsList } from "./ListOfOperations";
import { useInput } from "../../../../hooks/form/use-input";


function AddNewProduct() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as newProductConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { operations, products } = routeData;
  // Check for errors within consolidated data
  if ('error' in operations || 'error' in products) {
    // Handle errors within consolidated data
    const errors = [
      'Error in stages: ' + (operations as FetchError).error,
      'Error in workspaceTypes: ' + (products as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }

  const [productOperations, setProductOperations] = useState<any>([]);

  //handle editing
  const [editId, seteditId] = useState<string | ''>('');
  const handleNodeClick = (nodeId: string) => {   
    seteditId(nodeId);
  };

  //inputs
  const { 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    message: nameErrorMessage
  } = useInput([{name: 'required'}], '');

  const { 
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError, 
    valueChangeHandler: commentChangedHandler, 
    inputBlurHandler: commentBlurHandler,
    message: commentErrorMessage
  } = useInput([], '');
  
//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid) {
  formIsValid = true;
}
  

  return (
    <VStack>
      <HStack width="100%" spacing="24px">
        <Box flex="1">
          <Form>
            <FormControl isRequired isInvalid={nameInputHasError}>
                <FormLabel>
                  Name:
                </FormLabel>
                  <Input
                    id="stageName"
                    type="text"
                    name="stageName"
                    onChange={nameChangedHandler}
                    onBlur={nameBlurHandler}
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
                    <Input
                      id="stageComment"
                      type="text"
                      name="stageComment"
                      onChange={commentChangedHandler}
                      onBlur={commentBlurHandler}
                    />
                  {!commentInputHasError? (
                      <FormHelperText>
                      enter comment
                      </FormHelperText>
                      ) : (
                      <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                      )}
            
            </FormControl>
            <Button 
          type="submit" 
          isDisabled = {!formIsValid || isSubmitting}
          >
            SAVE PRODUCT
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
        <Box flex="2">
          <VisNetwork productOperations={productOperations} onNodeClick={handleNodeClick}/>
        </Box>
      </HStack>
      <HStack width="100%" spacing="24px">
        <Box flex="2">
          <OperationComponentAddition editId={editId} setEditId={seteditId} operations={operations} productOperations={productOperations} components={products} setProductOperations={setProductOperations} />
        </Box>
        <Box flex="1">
          <OperationsList operations={productOperations} />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AddNewProduct;

/* export async function action({ request }: { request: Request }) {
  
  const data = await request.formData();
  
  const product = {
    name: data.get("name"),
    comment: data.get("comment"), 
    operations: JSON.parse(data.get("operationsForProduct"))[0].items 
  };

  console.log(product);

  try {
    await addNewProductFetch(product);
  } catch (err) {
    return err;
  }
  
  //const resData: string = await response.json();

  return redirect("/administration/products");
  //return redirect("/administration/workspaces/" + resData);
} */



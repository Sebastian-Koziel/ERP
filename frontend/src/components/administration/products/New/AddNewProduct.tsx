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
  useToast,
} from "@chakra-ui/react";


import { FetchError } from "../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { newProductConsolidatedData } from "../utils/newProductLoader";
import VisNetwork from "../../../../hooks/vis-network/vis-network";
import { OperationComponentAddition } from "./AddOperationComponent";
import { OperationsList } from "./ListOfOperations";
import { useInput } from "../../../../hooks/form/use-input";
import { addNewProductFetch } from "../utils/newProduct";
import { CreateProduct } from "../Interfaces/CreateProduct";


function AddNewProduct() {
  const toast = useToast();
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
  //for checking if all node are connected
  const [allConnected, setAllConnected] = useState<boolean>(false);

  const [productOperations, setProductOperations] = useState<any>([]);
  const [productComponents, setProductproductComponents] = useState<any>([]);

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

//handle submiting new product
const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(allConnected)
//check if at least 1 operation added if not return error
if(productOperations.length < 1){
  toast({
    title: "Not enough operations!",
    description: "You need at least 1 operation for your product",
    status: "error",
    duration: 5000,
    position: 'top',
    isClosable: true
  });
  return;
}
//check if all nodes are connected
if(!allConnected){
  toast({
    title: "Not connected",
    description: "Some of your nodes are not connected",
    status: "error",
    duration: 5000,
    position: 'top',
    isClosable: true
  });
  return;
}

const newProductdata: CreateProduct = {
  name: formData.get("productName") as string,
  comment: formData.get("productComment") as string,
  operations: productOperations,
  components: productComponents
};

  try {
    const response = await addNewProductFetch(newProductdata);
    toast({
      title: "Stage added",
      description: "Product has been successfully added",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    
    navigate("..");
  } catch (error:any) {
    toast({
      title: "Error.",
      description: error.message || "Something went wrong with adding this product",
      status: "error",
      position: 'top',
      duration: 5000,
      isClosable: true
    });
  }
}

  return (
    <VStack>
      <HStack width="100%" spacing="24px">
        <Box flex="1">
          <Form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={nameInputHasError}>
                <FormLabel>
                  Name:
                </FormLabel>
                  <Input
                    id="productName"
                    type="text"
                    name="productName"
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
                      id="productComment"
                      type="text"
                      name="productComment"
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
          <VisNetwork productComponents={productComponents} productOperations={productOperations} onNodeClick={handleNodeClick} setAllConnected={setAllConnected}/>
        </Box>
      </HStack>
      <HStack width="100%" spacing="24px">
        <Box flex="2">
          <OperationComponentAddition 
          editId={editId} 
          setEditId={seteditId} 
          operations={operations} 
          productOperations={productOperations} 
          components={products} 
          productComponents={productComponents}
          setProductOperations={setProductOperations} 
          setProductComponents={setProductproductComponents} />
        </Box>
        <Box flex="1">
          <OperationsList operations={productOperations} components={productComponents}/>
        </Box>
      </HStack>
    </VStack>
  );
};

export default AddNewProduct;



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
import VisNetwork from "../../../../hooks/vis-network/vis-network";
import { useInput } from "../../../../hooks/form/use-input";
import { editProductConsolidatedData } from "../utils/editProductLoader";
import { OperationComponentAddition } from "../New/AddOperationComponent";
import { OperationsList } from "../New/ListOfOperations";
import { UpdateProductData } from "../Interfaces/updateProduct.interface";
import { updateProduct } from "../utils/editProduct";

import useConfirmationDialog from "../../../../hooks/AlertDialog";
import { deleteProduct } from "../utils/deleteProduct";


function EditProduct() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as editProductConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { operations, products, product } = routeData;
  // Check for errors within consolidated data
  if ('error' in operations || 'error' in products || 'error' in product) {
    // Handle errors within consolidated data
    const errors = [
      'Error in operations: ' + (operations as FetchError).error,
      'Error in products: ' + (products as FetchError).error,
      'Error in product: ' + (product as FetchError).error
    ];
    return <FetchErrorComponent errors={errors} />;
  }

  const productToEdit = product;
  //check if product is in use in orders
  const productInUse = productToEdit.usedIn.length ? true : false;
  //check if all nodes are connected
  const [allConnected, setAllConnected] = useState<boolean>();
  const [productOperations, setProductOperations] = useState<any>(productToEdit.operations);
  const [productComponents, setProductComponents] = useState<any>(productToEdit.components);
  

  //handle editing node
  const [editId, seteditId] = useState<string | ''>('');
  const handleNodeClick = (nodeId: string) => {   
    seteditId(nodeId);
  };

  //inputs
  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    message: nameErrorMessage,
    cancelEdit: nameCancelEdit,
  } = useInput([{name: 'required'}], productToEdit.name);

  const {
    value: enteredComment, 
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError, 
    valueChangeHandler: commentChangedHandler, 
    inputBlurHandler: commentBlurHandler,
    message: commentErrorMessage,
    cancelEdit: commentCancelEdit, 
  } = useInput([], productToEdit.comment);
  
//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid) {
  formIsValid = true;
}

//product edit handle
//set up state
const [editing, setEditing] = useState(false);
const [operationsBeforeEditing, setOperationsBeforeEditing] = useState(productOperations);
const [componentsBeforeEditing, setComponentsBeforeEditing] = useState(productComponents);

const editButtonHandler = () =>{
  //cancel editing
  if(editing){
    nameCancelEdit();
    commentCancelEdit();
    setProductOperations(operationsBeforeEditing);
    setProductComponents(componentsBeforeEditing);
  }
  //check if product is not used in orders
  if(!productInUse){
  //go into editing if not editing
  setEditing(!editing);
  setOperationsBeforeEditing(productOperations);
  setComponentsBeforeEditing(productComponents);
  }
  else{
    toast({
      title: "Product in use!",
      description: "Product is already in use - you can`t edit it",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  }
}

//handle submiting edited product
const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
  
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

  //set new data
  const data: UpdateProductData = {
    id: productToEdit._id,
    attr : {
      name: enteredName,
      comment: enteredComment,
      operations: productOperations,
      components: productComponents
    }
  }
  try {
    const response = await updateProduct(data);
    toast({
      title: "Product updated",
      description: "Product has been successfully updated",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    //turn off editing
    setEditing(!editing);
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with updating this product",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
  }
}
//delete handler
const { getConfirmation, ConfirmationDialog } = useConfirmationDialog();
const deleteHandler = () => {
  //if product in use - you cant delete
  if(productInUse){
    toast({
      title: "Product in use!",
      description: "Product is already in use - you can`t delete it",
      status: "error",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    return
  }
  else{
    //double check if to proceed
    getConfirmation(
      async ()=>{
        try {
          const response = await deleteProduct(productToEdit._id);
          toast({
            title: "Product deleted",
            description: "Product has been successfully deleted",
            status: "success",
            duration: 5000,
            position: 'top',
            isClosable: true
          });
          //nav awai
          navigate("..");
        } catch (err: any) {
          toast({
            title: "Error.",
            description: err.message || "Something went wrong with deleting this product",
            status: "error",
            duration: 5000,
            position: 'top',
            isClosable: true
          });
        }
      }
    )
  }
}

  return (
    <>
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
                    value={enteredName}
                    readOnly={!editing}
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
                      value={enteredComment}
                      readOnly={!editing}
                    />
                  {!commentInputHasError? (
                      <FormHelperText>
                      enter comment
                      </FormHelperText>
                      ) : (
                      <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                      )}
            
            </FormControl>
            {editing && (
            <Button 
          type="submit" 
          isDisabled = {!formIsValid || isSubmitting}
          >
            SAVE 
          </Button>
            )}
          <Button 
            onClick={editButtonHandler}
            variant="outline" 
            colorScheme="purple">
              {!editing ? 'Edit' : 'Cancel'}
          </Button>
          <Button
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            variant="outline"
            colorScheme="purple"
          >
            Go back
          </Button>
          <Button 
            onClick={deleteHandler}
             
            colorScheme="red">
              remove
            </Button>
          </Form>
        </Box>
        <Box flex="2">
          <VisNetwork productComponents={productComponents} productOperations={productOperations} onNodeClick={handleNodeClick} setAllConnected={setAllConnected}/>
        </Box>
      </HStack>
      <HStack width="100%" spacing="24px">
      {editing && (
        <Box flex="2">
          <OperationComponentAddition
          editId={editId} 
          setEditId={seteditId} 
          operations={operations} 
          productOperations={productOperations} 
          components={products} 
          productComponents={productComponents}
          setProductOperations={setProductOperations} 
          setProductComponents={setProductComponents} />
        </Box>
        )}
        <Box flex="1">
          <OperationsList operations={productOperations} components={productComponents}/>
        </Box>
      </HStack>
    </VStack>
    <ConfirmationDialog 
        title="Delete product" 
        message="Are you sure you want to delete this product? You can't undo this action afterwards." 
    />
    </>
  );
};

export default EditProduct;




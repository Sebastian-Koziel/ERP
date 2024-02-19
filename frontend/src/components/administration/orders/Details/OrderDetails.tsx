import { useLoaderData, Form, useNavigate, useNavigation } from "react-router-dom";
import {
    Container,
    Input,
    Button,
    useToast,
    FormErrorMessage,
    FormLabel,
    FormControl,
    FormHelperText,
    Textarea,
    Box,
    Heading,
    List,
  } from "@chakra-ui/react";
import { useState } from "react";
import { startOrder } from "../utils/postStartOrder";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError } from "../utils/newOrderLoader";
import { ProductForOrder } from "../Interfaces/ProductForOrder.interface";
import { editOrderConsolidatedData } from "../utils/orderDetailsLoader";
import { useDateInput } from "../../../../hooks/form/use-datePicker";
import { useInput } from "../../../../hooks/form/use-input";
import { StartOrder } from "../Interfaces/StartOrder.interface";
import useConfirmationDialog from "../../../../hooks/AlertDialog";
import { deleteOrder } from "../utils/deleteOrder";
import AddProductToOrder from "../new/AddProductToOrder";
import ProductListItem from "../new/ProductListItem";
import { UpdateOrderData } from "../Interfaces/UpdateOrder.interface";
import { updateOrder } from "../utils/updateOrder";

function OrderDetails() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

//handle fetching
const routeData = useLoaderData() as editOrderConsolidatedData | FetchError;
    
if ('error' in routeData) {
  
  return <FetchErrorComponent errors={routeData.error} />;
}
const { order, products } = routeData;
// Check for errors within consolidated data
if ('error' in order || 'error' in products) {
  // Handle errors within consolidated data
  const errors = [
    'Error in products: ' + (products as FetchError).error,
    'Error in order: ' + (order as FetchError).error
  ];
  return <FetchErrorComponent errors={errors} />;
}

const [orderToEdit, setOrderToEdit] = useState(order);
const [productsforOrder, setProductsforOrder] = useState<ProductForOrder[]>(orderToEdit.products);


const AddProductToTheList = (product:ProductForOrder) => {
  setProductsforOrder([...productsforOrder, product]);
}

const RemoveProductsFromTheList = (id:number) => {
  setProductsforOrder(productsforOrder.filter(product => product.id !== id)); 
}

//edit handle
//set up state
const [editing, setEditing] = useState(false);
const [productsPreEdit, setProductsPreEdit] = useState(productsforOrder);

const editButtonHandler = () =>{
  //cancel editing
  if(editing){
    nameReset();
    commentReset();
    externalNoReset();
    setProductsforOrder(productsPreEdit)
    
  }
  if(!orderToEdit.inProduction){
  //go into editing if not editing
  setEditing(!editing);
  setProductsPreEdit(productsforOrder);
  
  }
    else{
    toast({
        title: "order in production!",
        description: "Order is already in production - you can`t edit it",
        status: "error",
        duration: 5000,
        position: 'top',
        isClosable: true
    });
    }
}

//saving changes after editing
const submitFormHandler = async () => {

  const reqDeliveryDateValue = selectedDate;
  const reqDeliveryDate = reqDeliveryDateValue ? reqDeliveryDateValue.getTime() : null;

  //set new data
  const data: UpdateOrderData = {
    id: orderToEdit._id,
    attr : {
      name: enteredName,
      comment: enteredComment,
      externalOrderNo: enteredExternalNo,
      reqDeliveryDate: reqDeliveryDate,
      products: productsforOrder as ProductForOrder[]
    }
  }
  try {
    const response = await updateOrder(data);
    toast({
      title: "Order updated",
      description: "Order has been successfully updated",
      status: "success",
      duration: 5000,
      isClosable: true
    });
    
    //turn off editing
    setEditing(!editing);
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong with updating this order",
      status: "error",
      duration: 5000,
      isClosable: true
    });
  }
}


//inputs handlers
    //name
    const {
      value: enteredName, 
      isValid: enteredNameIsValid,
      hasError: nameInputHasError, 
      valueChangeHandler: nameChangedHandler, 
      inputBlurHandler: nameBlurHandler,
      message: nameErrorMessage,
      cancelEdit: nameReset
    } = useInput([{name: 'required'}], orderToEdit.name);
    //comment
    const {
      value: enteredComment, 
      isValid: enteredCommentIsValid,
      hasError: commentInputHasError, 
      valueChangeHandler: commentChangedHandler, 
      inputBlurHandler: commentBlurHandler,
      message: commentErrorMessage,
      cancelEdit: commentReset
    } = useInput([], orderToEdit.comment);
    //external number
    const {
      value: enteredExternalNo, 
      isValid: enteredExternalNoIsValid,
      hasError: externalNoInputHasError, 
      valueChangeHandler: externalNoChangedHandler, 
      inputBlurHandler: externalNoBlurHandler,
      message: externalNoErrorMessage,
      cancelEdit: externalNoReset
    } = useInput([], orderToEdit.externalOrderNo);
    //req delivery date
    const {
      selectedDate,
      isValid: dateIsValid,
      hasError: dateInputHasError,
      dateChangeHandler,
      message: dateErrorMessage
    } = useDateInput([], orderToEdit.reqDeliveryDate);
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dateChangeHandler(new Date(event.target.value));
    };


  const startOrderHandler = async () => {
    let data: StartOrder = {
      orderId: orderToEdit._id
    }
    try {
      await startOrder(data);
      toast({
        title: "Order staerted",
        description: "All products are in production now and order is active",
        status: "success",
        duration: 5000,
        position: 'top',
        isClosable: true
      });
      //fix state without fetching
      setOrderToEdit({ ...orderToEdit, inProduction: true });
    } catch (error:any) {
      toast({
        title: "Error.",
        description: error.message || "Something went wrong with starting your order",
        status: "error",
        position: 'top',
        duration: 5000,
        isClosable: true
      });
    }
  }
  
//form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid && enteredExternalNoIsValid) {
  formIsValid = true;
}

//delete handler
const { getConfirmation, ConfirmationDialog } = useConfirmationDialog();
const deleteHandler = () => {
  //if order in production - you cant delete
  if(orderToEdit.inProduction){
    toast({
      title: "Order in production!",
      description: "Product is already in production - you can`t delete it, you can only cancel it",
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
          const response = await deleteOrder(orderToEdit._id);
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
      <Container mt="1rem" mb="1rem" centerContent>
        {!orderToEdit.inProduction && (<Button onClick={startOrderHandler}>Start order</Button>)}
      <Box>
        <Form>
          <FormControl isInvalid={nameInputHasError} isRequired>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                id="operationName"
                type="text"
                name="operationName"
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
        <Textarea
          id="operationComment"
          name="operationComment"
          onChange={commentChangedHandler}
          onBlur={commentBlurHandler}
          value={enteredComment}
          readOnly={!editing}
        />
                {!commentInputHasError? (
                <FormHelperText>
                enter name
                </FormHelperText>
                ) : (
                <FormErrorMessage>{commentErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl isInvalid={commentInputHasError}>
      <FormLabel>
        external order no:
      </FormLabel>
        <Input
          id="externalOrderNo"
          name="externalOrderNo"
          onChange={externalNoChangedHandler}
          onBlur={externalNoBlurHandler}
          value={enteredExternalNo}
          readOnly={!editing}
        />
                {!externalNoInputHasError? (
                <FormHelperText>
                enter external no if needed
                </FormHelperText>
                ) : (
                <FormErrorMessage>{externalNoErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl isInvalid={dateInputHasError}>
      <FormLabel htmlFor="date-input">Select a required delivery date</FormLabel>
      <Input
        id="date-input"
        type="date"
        name="reqDeliveryDate"
        value={selectedDate ? selectedDate.toISOString().substring(0, 10) : ''}
        onChange={handleDateChange}
        onBlur={() => {}}
        placeholder="Select date"
        readOnly={!editing}
      />
      {dateInputHasError && <FormErrorMessage>{dateErrorMessage}</FormErrorMessage>}
    </FormControl>
    </Form>
    </Box>
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
    {editing && (<Box><Heading size="md" mt={"20px"}>Add products:</Heading>
    <AddProductToOrder products={products} AddProductToTheList={AddProductToTheList}/></Box>)}
    {productsforOrder.length > 0 && (<Heading size="md" mt={"20px"}>Products in your order:</Heading>)}
    <List>
        {productsforOrder.map((product: ProductForOrder) => (
          <ProductListItem key={product.id} product={product} editing={editing} inProduction={orderToEdit.inProduction} products={products} RemoveProductsFromTheList={RemoveProductsFromTheList}/>
        ))}
      </List>

      <ConfirmationDialog 
        title="Delete order" 
        message="Are you sure you want to delete this order?" 
    />

    </Container>
  
    </>
  );
}

export default OrderDetails;



import { Order } from "../Interfaces/Order.interface";
import { useLoaderData, Form, useNavigate, useNavigation } from "react-router-dom";
import {
    Container,
    Input,
    Button,
    Spacer, 
    Stack,
    Select,
    useToast,
    FormErrorMessage,
    FormLabel,
    FormControl,
    FormHelperText,
    Textarea,
    Box,
  } from "@chakra-ui/react";
import { useState } from "react";
import { startOrder } from "../utils/postStartOrder";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError } from "../utils/newOrderLoader";
import { ProductForOrder } from "../Interfaces/ProductForOrder";
import { editOrderConsolidatedData } from "../utils/orderDetailsLoader";
import { useDateInput } from "../../../../hooks/form/use-datePicker";
import { useInput } from "../../../../hooks/form/use-input";
import { StartOrder } from "../Interfaces/StartOrder.interface";

function OrderDetails() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

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


//inputs handlers
    //name
    const {
      value: enteredName, 
      isValid: enteredNameIsValid,
      hasError: nameInputHasError, 
      valueChangeHandler: nameChangedHandler, 
      inputBlurHandler: nameBlurHandler,
      message: nameErrorMessage
    } = useInput([{name: 'required'}], orderToEdit.name);
    //comment
    const {
      value: enteredComment, 
      isValid: enteredCommentIsValid,
      hasError: commentInputHasError, 
      valueChangeHandler: commentChangedHandler, 
      inputBlurHandler: commentBlurHandler,
      message: commentErrorMessage
    } = useInput([], orderToEdit.comment);
    //external number
    const {
      value: enteredExternalNo, 
      isValid: enteredExternalNoIsValid,
      hasError: externalNoInputHasError, 
      valueChangeHandler: externalNoChangedHandler, 
      inputBlurHandler: externalNoBlurHandler,
      message: externalNoErrorMessage
    } = useInput([], orderToEdit.externalOrderNo);
    //req delivery date
    const {
      selectedDate,
      isValid: dateIsValid,
      hasError: dateInputHasError,
      dateChangeHandler,
      message: dateErrorMessage,
    } = useDateInput([], orderToEdit.reqDeliveryDate);
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dateChangeHandler(new Date(event.target.value));
    };

    const editing = false;
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
      //if editing - edit off
      //fix dispaly of status - now active
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
  const handleSubmit = async () => {
    
}

  return (
    <>
      <Container mt="1rem" mb="1rem" centerContent>
        <Button onClick={startOrderHandler}>Start order</Button>
      <Box>
        <Form onSubmit={handleSubmit}>
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

      </Container>
    </>
  );
}

export default OrderDetails;



import { useState } from "react";
import { Form, useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import {
  Container,
  Input,
  Box,
  Button,
  FormErrorMessage,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  List,
  Heading
} from "@chakra-ui/react";

import { useInput } from "../../../../hooks/form/use-input";
import { CreateOrderData } from "../Interfaces/CreateOrder.interface";
import { useDateInput } from "../../../../hooks/form/use-datePicker";
import { addNewOrderFetcher } from "../utils/postNewOrder";
import FetchErrorComponent from "../../../errorHandling/FetchErrorComponent";
import { FetchError, newOrderConsolidatedData } from "../utils/newOrderLoader";
import AddProductToOrder from "./AddProductToOrder";
import { ProductForOrder } from "../Interfaces/ProductForOrder.interface";
import ProductListItem from "./ProductListItem";


function AddNewOrder() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting";

//handle fetching
const routeData = useLoaderData() as newOrderConsolidatedData | FetchError;
    
if ('error' in routeData) {
  
  return <FetchErrorComponent errors={routeData.error} />;
}
const { products } = routeData;
// Check for errors within consolidated data
if ('error' in products) {
  // Handle errors within consolidated data
  const errors = [
    'Error in workspaceTypes: ' + (products as FetchError).error
  ];
  return <FetchErrorComponent errors={errors} />;
}

const [productsforOrder, setProductsforOrder] = useState<ProductForOrder[]>([]);

const AddProductToTheList = (product:ProductForOrder) => {
  setProductsforOrder([...productsforOrder, product]);
}

const RemoveProductsFromTheList = (id:number) => {
  console.log(id)
  console.log(productsforOrder)
  setProductsforOrder(productsforOrder.filter(product => product.id !== id));
  
  
}

  //inputs handlers
    //name
    const {
      value: enteredName, 
      isValid: enteredNameIsValid,
      hasError: nameInputHasError, 
      valueChangeHandler: nameChangedHandler, 
      inputBlurHandler: nameBlurHandler,
      message: nameErrorMessage
    } = useInput([{name: 'required'}], '');
    //comment
    const {
      value: enteredComment, 
      isValid: enteredCommentIsValid,
      hasError: commentInputHasError, 
      valueChangeHandler: commentChangedHandler, 
      inputBlurHandler: commentBlurHandler,
      message: commentErrorMessage
    } = useInput([], '');
    //external number
    const {
      value: enteredExternalNo, 
      isValid: enteredExternalNoIsValid,
      hasError: externalNoInputHasError, 
      valueChangeHandler: externalNoChangedHandler, 
      inputBlurHandler: externalNoBlurHandler,
      message: externalNoErrorMessage
    } = useInput([], '');
    //req delivery date
    const {
      selectedDate,
      isValid: dateIsValid,
      hasError: dateInputHasError,
      dateChangeHandler,
      message: dateErrorMessage,
    } = useDateInput([], null);
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dateChangeHandler(new Date(event.target.value));
    };
  
//handling submit
const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  
const reqDeliveryDateValue = formData.get('reqDeliveryDate');
const reqDeliveryDate = reqDeliveryDateValue ? new Date(reqDeliveryDateValue as string) : null;

const newOrderData:CreateOrderData = {
  name: formData.get("operationName") as string, 
  comment: formData.get("operationComment")as string,
  externalOrderNo: formData.get("externalOrderNo")as string,
  reqDeliveryDate: reqDeliveryDate,
  products: productsforOrder as ProductForOrder[]
};
  try {
    const response = await addNewOrderFetcher(newOrderData);
    toast({
      title: "Order added",
      description: "order has been successfully added",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    navigate("..");
  } catch (error:any) {
    toast({
      title: "Error.",
      description: error.message || "Something went wrong with adding this order",
      status: "error",
      position: 'top',
      duration: 5000,
      isClosable: true
    });
  }
}

  const cancelHandler = () => {
    navigate("..");
  }

  //form overall validation
let formIsValid = false;

if (enteredNameIsValid && enteredCommentIsValid && dateIsValid && enteredExternalNoIsValid) {
  formIsValid = true;
}

  
  return (
     <>
    
    <Container mt="1rem" mb="1rem" centerContent>
    <Box>
        <Form onSubmit={handleSubmit}>
        <Button 
          type="submit" 
          isDisabled = {!formIsValid}
          >
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
      />
      {dateInputHasError && <FormErrorMessage>{dateErrorMessage}</FormErrorMessage>}
    </FormControl>
    
    </Form>
    </Box>
    <Heading size="md" mt={"20px"}>Add products:</Heading>
    <AddProductToOrder products={products} AddProductToTheList={AddProductToTheList}/>
    {productsforOrder.length > 0 && (<Heading size="md" mt={"20px"}>Products in your order:</Heading>)}
    <List>
        {productsforOrder.map((product: ProductForOrder) => (
          <ProductListItem key={product.id} product={product} editing={false} inProduction={false} products={products} RemoveProductsFromTheList={RemoveProductsFromTheList}/>
        ))}
      </List>
    </Container>
    
    </>
  );
}

export default AddNewOrder



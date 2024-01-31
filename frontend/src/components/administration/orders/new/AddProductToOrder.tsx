import { Form, useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import {
  Container,
  Input,
  Box,
  Button,
  Spacer, 
  Stack,
  Select,
  OrderedList,
  FormErrorMessage,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast
} from "@chakra-ui/react";
import { useSelect } from "../../../../hooks/form/use-select";
import { useInput } from "../../../../hooks/form/use-input";
import { Product } from "../../products/Interfaces/Product.interface";

interface props {
    products: Product[]
    AddProductToTheList: (product:any) => void;

}


const AddProductToOrder: React.FC<props> = ({products, AddProductToTheList}) => {
    
    const {
        value: enteredqty, 
        isValid: enteredqtyIsValid,
        hasError: qtyInputHasError, 
        valueChangeHandler: qtyChangedHandler, 
        inputBlurHandler: qtyBlurHandler,
        message: qtyErrorMessage
      } = useInput([], '');
    const {
        value: enteredproduct, 
        isValid: enteredproductIsValid,
        hasError: productInputHasError, 
        valueChangeHandler: productChangedHandler, 
        inputBlurHandler: productBlurHandler,
        generateOptions: productGenerateOptions,
        message: productErrorMessage
      } = useSelect(products,[], '');
      
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const componentData= {
            productId: enteredproduct,
            qty: enteredqty
          };

        AddProductToTheList(componentData);
    }  
return (
 <> 
 <Box bgColor={"lightgray"}>
    <Form onSubmit={onSubmit}>
    <FormControl isRequired>
      <FormLabel>product</FormLabel>
          <Select 
            id="product"
            name="product" 
            value={enteredproduct}
            onChange={productChangedHandler}
            onBlur={productBlurHandler}
            placeholder="pick a product"
            >
          {productGenerateOptions()}   
          </Select>
          {!productInputHasError? (
                <FormHelperText>
                Pick a product
                </FormHelperText>
                ) : (
                <FormErrorMessage>{productErrorMessage}</FormErrorMessage>
                )}      
    </FormControl> 
    <FormControl isRequired>
            <FormLabel>
              qty:
            </FormLabel>
              <Input
                id="qty"
                type="number"
                name="qty"
                onChange={qtyChangedHandler}
                onBlur={qtyBlurHandler}
                value={enteredqty}
                
              />

                {!qtyInputHasError? (
                <FormHelperText>
                enter qty
                </FormHelperText>
                ) : (
                <FormErrorMessage>{qtyErrorMessage}</FormErrorMessage>
                )}
          </FormControl>
          <Button
          type="submit"
          >
            Add
          </Button>
    </Form>
</Box>        
  </>
  )
}

export default AddProductToOrder



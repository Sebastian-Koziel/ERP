import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react"
import { ProductForOrder } from "../Interfaces/ProductForOrder.interface";
import { Product } from "../../products/Interfaces/Product.interface";
import { getObjectById } from "../../../../utils/utils";
import { CloseIcon } from "@chakra-ui/icons";



interface props {
    product: ProductForOrder
    products: Product[]
    RemoveProductsFromTheList: (id:number) => void
    editing: boolean
    inProduction: boolean
}


const ProductListItem: React.FC<props> = ( props ) => {
    const fullProduct = getObjectById(props.products, props.product.productId);

    const removeHandler = () => {
        props.RemoveProductsFromTheList(props.product.id);
        console.log(`er`)
    }

    return (
        <Container maxW="md" bg="white" boxShadow="md" p={4} rounded="md" my={2}>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">{fullProduct.name}</Text>
            <Box mx={2}>
            <Text>qty: {props.product.qty}</Text>
            </Box>
            {props.editing && (<IconButton
              aria-label="Remove product"
              icon={<CloseIcon />}
              onClick={removeHandler} // Replace with actual remove function
            />)}
          </Flex>
        </Container>
      );
}

export default ProductListItem
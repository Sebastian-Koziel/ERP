import { Box, List, ListItem } from '@chakra-ui/react';
import { ProductOperation } from '../Interfaces/ProductOperation';


interface AddOperationFormProps {
  operations: ProductOperation[];
}

export const OperationsList: React.FC<AddOperationFormProps> = ({ operations } ) => {
    
  return (
    <Box>
      <List>
        {operations.map((operation: ProductOperation) => (
          <ListItem key={operation._id}>{operation.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

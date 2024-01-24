import { Box, List, ListItem } from '@chakra-ui/react';
import { ProductOperation } from '../Interfaces/ProductOperation';
import { ProductComponent } from '../Interfaces/ProductComponent';


interface AddOperationFormProps {
  operations: ProductOperation[];
  components: ProductComponent[];
}

export const OperationsList: React.FC<AddOperationFormProps> = ({ operations, components } ) => {
    
  return (
    <Box>
      <List>
        {operations.map((operation: ProductOperation) => (
          <ListItem key={operation._id}>{operation.name}</ListItem>
        ))}
        {components.map((components: ProductComponent) => (
          <ListItem key={components._id}>{components.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

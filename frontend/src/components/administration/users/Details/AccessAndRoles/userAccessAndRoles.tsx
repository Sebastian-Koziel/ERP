import { Box, Button, Heading, Switch, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UpdateUserAccess } from "../../Interfaces/updateAccess";
import { User } from "../../Interfaces/user.interface";
import { updateUserAccess } from "../../Utils/updateUserAccess";

 interface userAccesProps {
  user: User
  setUser:React.Dispatch<React.SetStateAction<any>>
}

interface Access {
  production: {
    generalAccess: boolean;
  };
  administration: {
    generalAccess: boolean;
    companySetup: boolean;
    addAndEditUsers: boolean;
    editUserAcces: boolean;
  };
  orders: {
    canPlaceOrder: boolean;
  };
}

const UserAccess:React.FC<userAccesProps> = ({user, setUser}) => {

    const toast = useToast();
    const [isDirty, setIsDirty] = useState(false);
    const [initialUser, setInitialUser] = useState(user);
  
    useEffect(() => {
      // Compare user with initialUser to check for changes
      const hasChanges =
        JSON.stringify(user) !== JSON.stringify(initialUser);
      setIsDirty(hasChanges);
    }, [user, initialUser]);

  const handleAccessChange = (category: keyof Access, field: string, value: any) => {
    setUser({
      ...user,
      access: {
        ...user.access,
        [category]: {
          ...user.access[category],
          [field]: value,
        },
      },
    });
  };

  const handleSave = async () => {
    //set new data
  const data: UpdateUserAccess = {
    id: user._id,
    attr : {
      access: user.access
    }
  }
  try {
    const response = await updateUserAccess(data);
    toast({
      title: "Access updated",
      description: "Access set updated",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    setInitialUser(user);
    setIsDirty(false);
    
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong",
      status: "error",
      position: 'top',
      duration: 5000,
      isClosable: true
    });
  }
    
  };

  return (
    <Box>
      <Heading size="lg" mb="2">
        Access Settings
      </Heading>
      <Box>
        <Text fontSize="lg" mb="1">
          Production access
        </Text>
        <Switch
          isChecked={user.access.production.generalAccess}
          onChange={(e) =>
            handleAccessChange("production", "generalAccess", e.target.checked)
          }
        />
      </Box>
      <Box>
        <Text fontSize="lg" mb="1">
          Administration access
        </Text>
        <Switch
          isChecked={user.access.administration.generalAccess}
          onChange={(e) =>
            handleAccessChange(
              "administration",
              "generalAccess",
              e.target.checked
            )
          }
        />
        <Text fontSize="lg" mb="1">
          Company Setup
        </Text>
        <Switch
          isChecked={user.access.administration.companySetup}
          onChange={(e) =>
            handleAccessChange(
              "administration",
              "companySetup",
              e.target.checked
            )
          }
        />
        <Text fontSize="lg" mb="1">
          Add and Edit Users
        </Text>
        <Switch
          isChecked={user.access.administration.addAndEditUsers}
          onChange={(e) =>
            handleAccessChange(
              "administration",
              "addAndEditUsers",
              e.target.checked
            )
          }
        />
        <Text fontSize="lg" mb="1">
          Edit User Access
        </Text>
        <Switch
          isChecked={user.access.administration.editUserAcces}
          onChange={(e) =>
            handleAccessChange(
              "administration",
              "editUserAcces",
              e.target.checked
            )
          }
        />
      </Box>
      <Box>
        <Text fontSize="lg" mb="1">
          Can make orders
        </Text>
        <Switch
          isChecked={user.access.orders.canPlaceOrder}
          onChange={(e) =>
            handleAccessChange("orders", "canPlaceOrder", e.target.checked)
          }
        />
      </Box>
      {isDirty && (
        <Button onClick={handleSave} colorScheme="purple" mt="4">
          Save
        </Button>
      )}
    </Box>
  );
}


export default UserAccess;



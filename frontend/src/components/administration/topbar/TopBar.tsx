import {
  Flex,
  Center,
  Button,
  Heading,
  Text,
  Box,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { storageGetUser } from "../../../utils/localhostHandlers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import { storagelogOut } from "../../../services/auth";

function TopBar() {
  const navigate = useNavigate();
  const views = [
    { path: "/client", name: 'client' },
    { path: "/production", name: 'production' },
    { path: "/administration", name: 'administration' },
    { path: "/canvas", name: 'canvas' }
  ];
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const user = storageGetUser();

  const dropDownLinkClickedHandler = (path: string) => {
    setDropDownOpen(false);
    navigate(path);
  }

  const logoutHandler = ()=>{
    storagelogOut();
    navigate("/");
  }

  return (
    <section>
      <Flex
        w="100%"
        h="3.5rem"
        bg="purple.600"
        justify="space-between"
        wrap="wrap"
        gap="2"
      >
        <Center>
          <Box flexGrow="1" ml="1rem">
            <Heading color='aliceblue'>Statera</Heading>
          </Box>
        </Center>
        <Spacer />
        <Center>
          <Box>
            <Text color='aliceblue'>Hey {user.name}</Text>
          </Box>
          <Box>
            <Menu autoSelect={false}>
              {({ isOpen }) => (
                <>
                  <MenuButton as={IconButton} colorScheme="white" aria-label="Options" icon={<ViewIcon />} onClick={() => setDropDownOpen(!dropDownOpen)} />
                  {isOpen && (
                    <MenuList>
                      {views.map((menu) => (
                        <MenuItem key={menu.path} onClick={() => dropDownLinkClickedHandler(menu.path)}>{menu.name}</MenuItem>
                      ))}
                    </MenuList>
                  )}
                </>
              )}
            </Menu>
          </Box>
        </Center>
        <Center>
          <Box>
            
              <Button onClick={logoutHandler} mr="0.5rem" type="submit" color='aliceblue' colorScheme="purple" variant='outline'>
                Logout
              </Button>
            
          </Box>
        </Center>
      </Flex>
    </section>
  );
}

export default TopBar;

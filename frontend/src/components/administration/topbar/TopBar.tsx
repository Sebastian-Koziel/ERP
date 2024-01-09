import { Form, useNavigate } from "react-router-dom";
import {
  Flex,
  Center,
  Button,
  Heading,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { storageGetUser } from "../../../utils/localhostHandlers";
import monitorIcon from '../../../assets/monitor.png';
import './tobbar.css'
import { useState } from "react";

/* TO DO
change drop down manu and show only views that user can access

*/

function TopBar() {

  const views = [{path:"/client", name:'client'}, {path:"/production", name:'production'}, {path:"/administration", name:'administration'}, {path:"/canvas", name:'canvas'}];
  const [dropDownOpen, setDropDownOpen] = useState(false); 
  const navigate = useNavigate()
  const user = storageGetUser();

  const dropDownLinkClickedHandler = (path:string) => {
    setDropDownOpen(false);
    navigate(path);  
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
            <>
              <Text color='aliceblue'>Hey {user.name}</Text>
            </>
          </Box>
          
         <Box>
            <div className="monitor-icon-container">
          <img onClick={(e)=>setDropDownOpen(!dropDownOpen)} src={monitorIcon} alt="Monitor" />
          
          {dropDownOpen && 
            <div className="dropdown">
              <ul>
                {views.map((menu) => (
                  <li onClick={(e)=>{dropDownLinkClickedHandler(menu.path)}} className="dropdownElement" key={menu.path}>{menu.name}</li>
                ))}
              </ul>
            </div>
          }
          </div>
          
          </Box>
        </Center>
        <Center>
          <Box>
            <Form action="/logout" method="post">
              <Button mr="0.5rem" type="submit" color='aliceblue' colorScheme="purple" variant='outline'>
                Logout
              </Button>
            </Form>
          </Box>
        </Center>
      </Flex>
    </section>
  );
}

export default TopBar;

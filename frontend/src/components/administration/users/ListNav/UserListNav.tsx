import { NavLink } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
function UserListNav() {
  return (
   
    <Stack m="1rem">
      <Button variant="solid" colorScheme="purple">
        <NavLink
          to=""
          className={(navData) => (navData.isActive ? "active" : undefined)}
          end
        >
          List
        </NavLink>
      </Button>
      <Button variant="solid" colorScheme="purple">
        <NavLink
          to="new"
          className={(navData) => (navData.isActive ? "active" : undefined)}
        >
          New
        </NavLink>
      </Button>
    </Stack>
  );
}

export default UserListNav;

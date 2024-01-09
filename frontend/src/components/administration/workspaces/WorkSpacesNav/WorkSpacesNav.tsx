import { NavLink } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
function WorkSpacesNav() {
  return (
    <Stack m="1rem">
      <Button variant="solid" colorScheme="purple">
        <NavLink
          to=""
          className={(navData) => (navData.isActive ? "active" : undefined)}
          end
        >
          Worspaces
        </NavLink>
      </Button>
      <Button variant="solid" colorScheme="purple">
        <NavLink
          to="types"
          className={(navData) => (navData.isActive ? "active" : undefined)}
        >
          Workspaces types
        </NavLink>
      </Button>
    </Stack>
  );
}

export default WorkSpacesNav;
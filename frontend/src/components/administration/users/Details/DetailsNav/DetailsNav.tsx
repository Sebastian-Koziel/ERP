import { NavLink } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";

function UserDetailsNav() {
  return (
    <>
      <Stack spacing={1} mt="1rem" mr="1rem">
        <Button variant="outline" colorScheme="purple">
          <NavLink
            to=""
            className={(navData) => (navData.isActive ? "active" : undefined)}
            end
          >
            General information
          </NavLink>
        </Button>

        <Button variant="outline" colorScheme="purple">
          <NavLink
            to="access"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Role and access
          </NavLink>
        </Button>
      </Stack>
    </>
  );
}

export default UserDetailsNav;

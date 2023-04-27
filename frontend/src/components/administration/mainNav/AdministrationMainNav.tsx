import { hasAccessToStages, hasAccessToUsers } from "../../../services/auth";
import "./AdministrationMainNav.css";
import { NavLink } from "react-router-dom";
import { Stack, Box, Heading, Button, Divider } from "@chakra-ui/react";

function AdministrationMainNav() {
  return (
    <Stack padding="1rem" pt="0.5rem" spacing={1}>
      <Divider />
      <Button variant="ghost" colorScheme="purple">
        <NavLink
          to=""
          className={(navData) => (navData.isActive ? "active" : undefined)}
          end
        >
          Home
        </NavLink>
      </Button>

      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="stages"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Stages
          </NavLink>
        </Button>
      )}
      {hasAccessToUsers() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="users"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Users
          </NavLink>
        </Button>
      )}
      <Divider />
    </Stack>
  );
}

export default AdministrationMainNav;

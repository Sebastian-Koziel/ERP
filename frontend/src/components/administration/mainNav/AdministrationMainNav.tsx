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
            to="production"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Production
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="plan"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Plan
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="orders"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Orders
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="products"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Products
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="operations"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Operations
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="stages"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Stages
          </NavLink>
        </Button>
      )},
      {hasAccessToStages() && (
        <Button variant="ghost" colorScheme="purple">
          <NavLink
            to="workspaces"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            Workspaces
          </NavLink>
        </Button>
      )},
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

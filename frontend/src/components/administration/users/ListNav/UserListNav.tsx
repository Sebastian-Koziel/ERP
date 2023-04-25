import { NavLink } from "react-router-dom";
function UserListNav() {
  return (
    <>
      <ul>
        <li>
          <NavLink
            to=""
            className={(navData) => (navData.isActive ? "active" : undefined)}
            end
          >
            List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="new"
            className={(navData) => (navData.isActive ? "active" : undefined)}
          >
            New
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default UserListNav;

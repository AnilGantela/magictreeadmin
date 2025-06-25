import React from "react";
import { Nav, Logo, NavLinks, SLink } from "./styledComponents"; // Import styled components
const Navbar = () => {
  return (
    <Nav>
      <Logo>MagicTree Admin</Logo>
      <NavLinks>
        <li>
          <SLink to="/dashboard">Dashboard</SLink>
        </li>
        <li>
          <SLink to="/users">Users</SLink>
        </li>
        <li>
          <SLink to="/settings">Settings</SLink>
        </li>

        <li>
          <SLink to="/add-product">Add product</SLink>
        </li>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

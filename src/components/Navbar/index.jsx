import React from "react";
import { Nav, Logo, NavLinks, SLink } from "./styledComponents"; // Import styled components
const Navbar = () => {
  return (
    <Nav>
      <Logo>MagicTree Admin</Logo>
      <NavLinks>
        <li>
          <SLink to="/">Dashboard</SLink>
        </li>
        <li>
          <SLink to="/orders">Orders</SLink>
        </li>
        <li>
          <SLink to="/products">Products</SLink>
        </li>

        <li>
          <SLink to="/add-product">Add product</SLink>
        </li>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

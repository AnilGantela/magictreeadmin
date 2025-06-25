import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d3748;
  padding: 0.75rem 2rem;
  color: #fff;
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const SLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
`;

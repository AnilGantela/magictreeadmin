import styled from "styled-components";

// Main page container
export const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

// Main title
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

// Sub-description under title
export const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

// Section sub-headings (e.g. "Delivered Orders")
export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #34495e;
  text-align: center;
`;

// Loading text
export const LoadingText = styled.p`
  font-size: 1rem;
  color: #888;
`;

// Error text
export const ErrorText = styled.p`
  font-size: 1rem;
  color: red;
  font-weight: bold;
`;

// Count boxes container
export const CountsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0 1rem 0;
  flex-wrap: wrap;
`;

// Individual count box
export const CountBox = styled.div`
  background-color: #ecf0f1;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  color: #2c3e50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Horizontal columns for order lists
export const HorizontalLists = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  & > div {
    flex: 1;
    min-width: 300px;
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
`;

// List wrapper for orders
export const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Individual order card
export const OrderItem = styled.li`
  background-color: #f1f1f1;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border-left: 5px solid #3498db;

  p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #2c3e50;
  }

  strong {
    color: #333;
  }
`;

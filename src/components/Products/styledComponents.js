import styled from "styled-components";

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #3498db;
  }
`;

export const Container = styled.div`
  padding: 2rem;
  background-color: #f4f6f8;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const LoadingText = styled.p`
  font-size: 1rem;
  color: #2980b9;
`;

export const ErrorText = styled.p`
  font-size: 1rem;
  color: #e74c3c;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 1rem;

  &:hover {
    transform: translateY(-2px);
    transition: 0.2s;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
`;

export const ProductName = styled.h4`
  font-size: 1rem;
  color: #2c3e50;
  margin: 0.5rem 0;
`;

export const ProductPrice = styled.p`
  font-size: 1rem;
  color: #27ae60;
  font-weight: bold;
`;

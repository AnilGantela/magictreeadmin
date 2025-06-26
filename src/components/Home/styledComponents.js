// styledComponents.js
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const StatCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  background-color: #f0f4ff;
  border: 1px solid #ccc;
  border-radius: 12px;
  flex: 1;
  min-width: 200px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
  }
`;

export const ChartContainer = styled.div`
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 1rem;
    color: #222;
    text-align: center;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
`;

export const ErrorText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: red;
`;

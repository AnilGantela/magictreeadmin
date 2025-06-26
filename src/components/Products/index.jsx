import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Title,
  Grid,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  LoadingText,
  ErrorText,
  SearchInput,
} from "./styledComponents";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://magictreebackend.onrender.com/products/"
        );
        console.log("Products fetched:", response.data.products);
        setProducts(response.data.products);
        setFiltered(response.data.products); // initially show all
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when search changes
  useEffect(() => {
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredProducts);
  }, [search, products]);

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <LoadingText>Loading products...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <Grid>
          {filtered.length === 0 ? (
            <p>No products Found</p>
          ) : (
            filtered.map((product) => (
              <ProductCard key={product._id}>
                <ProductImage src={product.images[0]} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductPrice>₹{product.price}</ProductPrice>
              </ProductCard>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Products;

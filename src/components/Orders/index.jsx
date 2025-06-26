import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Title,
  Description,
  SectionTitle,
  LoadingText,
  ErrorText,
  CountsContainer,
  CountBox,
  HorizontalLists,
  OrderList,
  OrderItem,
} from "./styledComponents";
import Cookies from "js-cookie";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingProcessingOrders, setPendingProcessingOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const token = Cookies.get("adminToken");
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://magictreebackend.onrender.com/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allOrders = response.data.orders;

        const pendingProcessing = allOrders
          .filter((o) => o.status === "Pending" || o.status === "Processing")
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const shipped = allOrders
          .filter((o) => o.status === "Shipped")
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        const delivered = allOrders
          .filter((o) => o.status === "Delivered")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first

        setPendingProcessingOrders(pendingProcessing);
        setShippedOrders(shipped);
        setDeliveredOrders(delivered);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      {loading && <LoadingText>Loading orders...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <>
          <CountsContainer>
            <CountBox>
              Pending / Processing: {pendingProcessingOrders.length}
            </CountBox>
            <CountBox>Shipped: {shippedOrders.length}</CountBox>
            <CountBox>Delivered: {deliveredOrders.length}</CountBox>
          </CountsContainer>

          <HorizontalLists>
            <div>
              <SectionTitle>Pending / Processing</SectionTitle>
              <OrderList>
                {pendingProcessingOrders.map((order) => (
                  <OrderItem key={order._id}>
                    <p>
                      <strong>ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹
                      {(order.totalAmount / 100).toFixed(2)}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </OrderItem>
                ))}
              </OrderList>
            </div>

            <div>
              <SectionTitle>Shipped</SectionTitle>
              <OrderList>
                {shippedOrders.map((order) => (
                  <OrderItem key={order._id}>
                    <p>
                      <strong>ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹
                      {(order.totalAmount / 100).toFixed(2)}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </OrderItem>
                ))}
              </OrderList>
            </div>

            <div>
              <SectionTitle>Delivered</SectionTitle>
              <OrderList>
                {deliveredOrders.map((order) => (
                  <OrderItem key={order._id}>
                    <p>
                      <strong>ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹
                      {(order.totalAmount / 100).toFixed(2)}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </OrderItem>
                ))}
              </OrderList>
            </div>
          </HorizontalLists>
        </>
      )}
    </Container>
  );
};

export default Home;

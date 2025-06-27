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

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [newPaymentStatus, setNewPaymentStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

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
        console.log("Fetched orders:", allOrders);

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
                  <OrderItem
                    key={order._id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewOrderStatus(order.status);
                      setNewPaymentStatus(order.paymentStatus || ""); // fallback
                      setShowModal(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
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
                  <OrderItem
                    key={order._id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewOrderStatus(order.status);
                      setNewPaymentStatus(order.paymentStatus || ""); // fallback
                      setShowModal(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
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
      {showModal && selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "300px",
            }}
          >
            <h3>Update Order</h3>
            <p>
              <strong>ID:</strong> {selectedOrder._id}
            </p>

            <label>Order Status:</label>
            <select
              value={newOrderStatus}
              onChange={(e) => setNewOrderStatus(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <label>Payment Status:</label>
            <select
              value={newPaymentStatus}
              onChange={(e) => setNewPaymentStatus(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
              disabled={selectedOrder.paymentStatus === "Completed"} // Disable if already completed
            >
              <option value="">Select</option>
              <option value="Initiated">Initiated</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
            {selectedOrder.paymentStatus === "Completed" && (
              <p style={{ color: "green", fontSize: "14px" }}>
                Payment already completed. Status cannot be changed.
              </p>
            )}

            <button
              onClick={async () => {
                try {
                  const token = Cookies.get("adminToken");
                  await axios.put(
                    `https://magictreebackend.onrender.com/admin/update-order-status`,
                    {
                      orderId: selectedOrder._id,
                      status: newOrderStatus || selectedOrder.status,
                      paymentStatus:
                        newPaymentStatus || selectedOrder.paymentStatus,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  alert("Order updated successfully.");
                  setShowModal(false);
                  window.location.reload(); // Or refetchOrders();
                } catch (err) {
                  alert("Failed to update order.");
                  console.error(err);
                }
              }}
              style={{ marginRight: "10px" }}
            >
              Submit
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Orders;

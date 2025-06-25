import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // or Cookies.get("adminToken")
        const response = await axios.get(
          "https://magictreebackend.onrender.com/order/all", // Update this URL if needed
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h1>Welcome to the Admin Home Page</h1>
      <p>
        This is the main dashboard. Use the navigation to access different
        sections of the admin panel.
      </p>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <h3>Recent Orders</h3>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.slice(0, 5).map((order) => (
                <li key={order._id}>
                  <strong>Order ID:</strong> {order._id} &nbsp; | &nbsp;
                  <strong>Status:</strong> {order.status} &nbsp; | &nbsp;
                  <strong>Total:</strong> ₹
                  {(order.totalAmount / 100).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

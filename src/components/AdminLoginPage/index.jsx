import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Check if the JWT token is already present in cookies
    const token = Cookies.get("jwtToken");
    if (token) {
      // If token is found, redirect to the home page
      navigate("/"); // Redirect to home page
    }
  }, [navigate]); // Empty dependency array ensures this runs only once on component mount

  // Handle password change
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://magictreebackend.onrender.com/admin/login",
        {
          password,
        }
      );

      if (response.data.token) {
        // Store JWT token in cookies
        Cookies.set("jwtToken", response.data.token, { expires: 1 }); // Expires in 1 day
        navigate("/"); // Redirect to home page after login
        console.log("Login successful!"); // Log success message
      }
    } catch (error) {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

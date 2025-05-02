import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Correct import for Routes and Navigate
import AdminLogin from "./components/AdminLoginPage"; // Login page component
import ProtectedRoute from "./components/ProtectedRoute"; // Custom ProtectedRoute component
import ProductForm from "./components/ProductAddPage"; // Product form component

const App = () => {
  return (
    <>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<AdminLogin />} />
        {/* Protected route for admin dashboard, only accessible if authenticated */}
        <Route
          path="/"
          element={<ProtectedRoute component={ProductForm} />} // Use your custom ProtectedRoute here
        />
        {/* Redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        {/* Wildcard route for unmatched paths */}
      </Routes>
    </>
  );
};

export default App;

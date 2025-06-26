import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductForm from "./components/ProductAddPage";
import Home from "./components/Home";
import Products from "./components/Products";
import Orders from "./components/Orders";
import AdminLayout from "./components/AdminLayout";

const App = () => {
  return (
    <Routes>
      {/* No Navbar here */}
      <Route path="/login" element={<AdminLogin />} />

      {/* All protected routes go inside AdminLayout which includes Navbar */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            component={() => (
              <AdminLayout>
                <Home />
              </AdminLayout>
            )}
          />
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute
            component={() => (
              <AdminLayout>
                <ProductForm />
              </AdminLayout>
            )}
          />
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute
            component={() => (
              <AdminLayout>
                <Products />
              </AdminLayout>
            )}
          />
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute
            component={() => (
              <AdminLayout>
                <Orders />
              </AdminLayout>
            )}
          />
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;

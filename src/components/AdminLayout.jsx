// components/AdminLayout.js
import React from "react";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default AdminLayout;

import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default () => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
    <Navbar />
    <Dashboard />
  </div>
);
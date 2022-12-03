import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Pages
import { Clients, HomePage, NotFound, Orders, Products } from "./pages/Index";

export const App = () => (
  <div className="container">
    <Navbar bg="dark" variant="dark">
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/products">Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/customers">Customers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/orders">Orders</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Clients />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;

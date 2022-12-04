import { Route, Routes, Link } from "react-router-dom";
import "./nav-bar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Clients,
  HomePage,
  NotFound,
  Orders,
  Products,
} from "../../pages/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="black" variant="dark" className="justify-content-center">
        <Nav activeKey="/">
          <Navbar.Brand>
            <Link to="/" className="cursor-pointer ">
              <FontAwesomeIcon icon={faHouseLaptop} />
            </Link>
          </Navbar.Brand>
          <Nav.Item>
            <Link to="/" className="text">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/products" className="text">
              Products
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/customers" className="text">
              Customers
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/orders" className="text">
              Orders
            </Link>
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
    </>
  );
};

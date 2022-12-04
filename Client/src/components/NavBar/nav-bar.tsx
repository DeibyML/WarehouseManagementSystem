import { Route, Routes, Link } from 'react-router-dom';
import './nav-bar.css'
import Nav from 'react-bootstrap/Nav';
import { Clients, HomePage, NotFound, Orders, Products } from '../../pages/Index';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  return (
    <>
      <Nav className="justify-content-center mt-4" activeKey="/">
        <Navbar.Brand>
          <Link to="/" className="cursor-pointer mr-4">
            <FontAwesomeIcon icon={faHouseLaptop} />
          </Link>
        </Navbar.Brand>
        <Nav.Item className="mr-2">
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products">Products</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/customers">Customers</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/orders">Orders</Link>
        </Nav.Item>
      </Nav>
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

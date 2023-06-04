import { useState } from "react";
import { Badge, Button, Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cart from "./Cart";
import { useShoppingCart } from "../Contexts/cartContext";

function NavBarComponent() {
  const [show, setShow] = useState<boolean>(false);
  const { cartQuantity } = useShoppingCart();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shopping</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Button variant="outlined" onClick={handleShow} className="ms-auto">
              Cart <Badge bg="danger">{cartQuantity}</Badge>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBarComponent;

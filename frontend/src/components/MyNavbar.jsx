import React, { useContext } from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { clearUserData } from "../redux/slice/userDataSlice";
import { useDispatch } from "react-redux";

const MyNavbar = () => {
  const { loggedIn, username, setLoggedIn, setUsername } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  const dispatch = useDispatch()

  const clearUser = () => {
    dispatch(clearUserData())
  }

  return (
    <Navbar bg="light" expand="lg" style={{ padding: "8px" }}>
      <Navbar.Brand href="/" className="mx-3">
        <strong>Emmerce-9</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {loggedIn ? (
          <Nav className="ml-auto">
            <Link to ="/cart">
              <Button variant="primary" className="mx-2">
                Cart
              </Button>
            </Link>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <DropdownItem
                  onClick={() => navigate("/my-store")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Store
                </DropdownItem>
                <Dropdown.Item onClick={() => {handleLogout(); clearUser()}}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Link to="/login">
              <Button variant="primary" className="mx-2">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" className="mx-2">
                Register
              </Button>
            </Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;

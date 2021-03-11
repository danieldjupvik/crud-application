import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Navigation = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  const logout = () => {
    setAuth(null);
    history.push("/");
  };

  return (
    <Navbar bg="dark navbar-dark" expand="lg">
      <Navbar.Brand>CRUD-Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {auth ? (
            <>
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/add" className="nav-link">
                Add Products
              </NavLink>
              <Form inline>
                <Button variant="info" onClick={logout}>
                  Log out
                </Button>
              </Form>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

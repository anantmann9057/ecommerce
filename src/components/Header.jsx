import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  return (
    <div className="w-100 ">
      <Navbar expand="lg" className="bg-body-tertiary container-fluid ps-5">
        <Navbar.Brand as={Link} to="/">
          Welcome
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              My Cart
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item
                as={Link}
                to={user.profile ? "/profile" : "/auth"}
                className="d-flex justify-content-between"
              >
                {user.profile ? user.profile.email : "Login"}
                <img
                  height={"20px"}
                  width={"20px"}
                  src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                ></img>
              </NavDropdown.Item>
          
           
           {user.profile ? <NavDropdown.Item
                onClick={() => {
                  axios
                    .post("http://localhost:3000/auth/logout", {
                      withCredentials: true,
                    })
                    .then(function (response) {
                      toast(`${response.data}`);
                      console.log(response);
                    })
                    .catch(function (error) {
                      // handle error
                      console.log(error);
                    })
                    .finally(function () {
                      // always executed
                    });
                }}
              >
                Logout
              </NavDropdown.Item>:null}
             
              {/* <NavDropdown.Divider />
             */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

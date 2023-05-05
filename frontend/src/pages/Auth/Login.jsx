import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/LoginPage.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../components/AuthContext";
import { storeUserData } from "../../redux/slice/userDataSlice";

const Login = () => {
  const { setLoggedIn, setUsername, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const storeUser = item => {
    dispatch(storeUserData(item))
  }

  const handleLogin = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/auth/login",
        formData
      );
      if (response.status === 200) {
        alert("Login success");
        // Update loggedIn state and username in MyNavbar
        setLoggedIn(true);
        setUsername(formData.username);
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("store_name", response.data.store_name);
        setToken(token);
        navigate("/");
      } else {
        alert("Login failed. Username or password is invalid");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <Form className="my-form-control form-container" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <br />
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {handleSubmit(e); storeUser(formData.username)}}
        >
          Login
        </Button>
        <br />

        <Button
          variant="primary"
          type="submit"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register now!
        </Button>
      </Form>
    </div>
  );
};

export default Login;

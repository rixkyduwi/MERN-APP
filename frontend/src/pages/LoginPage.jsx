import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      console.log(response)
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/"); // Redirect to home or dashboard based on user role
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Tidak dapat terhubung ke server.");
      }
    }
  };

  return (
    <div className="body-login">
      <div className="login">
        <Container className="container-loginpage">
          <Row>
            <Col>
              <h2 className="text-center mb-2 fw-bold">Studiobook</h2>
            </Col>
          </Row>
          <Row className="row-cols-lg-2 row-cols-1">
            <Col>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="btn-loginpage btn btn-dark rounded-1 me-2 mb-xs-0 mb-2 mt-4 text-center align-item-center">
                  Login
                </Button>
              </Form>
              {msg && <p>{msg}</p>}
            </Col>
            <Col>
              <img src="./src/assets/img/logo.png" alt="logo" className="text-center mb-2" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-2">
              <a href="/register" className=" text-black">
                Belum mempunyai akun?
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;

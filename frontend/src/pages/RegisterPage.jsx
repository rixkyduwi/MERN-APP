import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confPassword,
      });
      setMsg(response.data.msg);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="body-login">
      <div className="login">
        <Container className="container-loginpage mt-5 mb-5">
          <Button className="btn-ajadeh btn btn-light border" onClick={() => navigate("/register")}>
            <i className="fa fa-chevron-left "></i>
          </Button>
          <Row>
            <Col>
              <h2 className="text-center mb-2 fw-bold">Studiobook</h2>
            </Col>
          </Row>

          <Row className="row-cols-lg-2 row cols-1">
            <Col>
              <Form onSubmit={Register}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicConfPassword">
                  <Form.Label>Conf Password</Form.Label>
                  <Form.Control type="password" placeholder="**********" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{fontsize: "15px !important"}} className="btn-loginpage btn btn-dark btn-lg rounded-1 me-2 mb-xs-0 mb-2 mt-4 text-center align-item-center">
                  Daftar
                </Button>
              </Form>
            </Col>
            <Col>
              <img src="src/assets/img/lampu.png" alt="logo" className="logoregis text-center mb-2" />
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-2">
              <a href="/" className=" text-black">
                Kembali ke Beranda?
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;

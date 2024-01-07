/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formdata);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  return (
    <Container>
      <Row>
        <Col md={5} className='login__bg'></Col>
        <Col
          md={7}
          className='d-flex align-items-center justify-content-center flex-direction-column'
        >
          <Form onSubmit={handleLogin} style={{ width: "80%", maxWidth: 500 }}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                required
                value={formdata.email}
                onChange={handleChange}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                required
                value={formdata.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Don't have an account ? <Link to={"/signup"}>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

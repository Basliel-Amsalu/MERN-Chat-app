/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import { Button, Form, Container, Col, Row, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import { AppContext } from "../appContext/context";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formdata);
    loginUser(formdata).then(({ data }) => {
      if (data) {
        console.log(data);
        socket.emit("new-user");
        navigate("/chat");
      }
    });
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
              {error && <p className='alert alert-danger'>{error.data}</p>}
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
              {isLoading ? <Spinner animation='grow' /> : "Login"}
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

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import bot from "../assets/bot.jpeg";

const Signup = () => {
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className='d-flex align-items-center justify-content-center flex-direction-column'
        >
          <Form style={{ width: "80%", maxWidth: 500 }}>
            <h1 className='text-center'>Create account</h1>
            <div className='signup-profile-pic__container'>
              <img src={bot} className='signup-profile-pic' alt='profile pic' />
              <label htmlFor='image-upload' className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input type='file' id='image-upload' accept='image/*' hidden />
            </div>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='email' placeholder='Enter your name' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Signup
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                already have an account ? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className='signup__bg'></Col>
      </Row>
    </Container>
  );
};

export default Signup;

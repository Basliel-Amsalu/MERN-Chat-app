/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import "./Signup.css";
import { Link } from "react-router-dom";
import bot from "../assets/bot.jpeg";

const Signup = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [imageState, setImageState] = useState({
    image: null,
    uploadingImg: false,
    imagePreview: null,
  });

  const validateImg = (e) => {
    const file = e.target.files[0];

    if (file.size > 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImageState((prevImageState) => ({
        ...prevImageState,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imageState.image);
    data.append("upload_preset", "cloudupload");
    try {
      setImageState({ ...imageState, uploadingImg: true });
      let res = await fetch(
        `https://api.cloudinary.com/v1_1/dwlj3rlif/image/upload`,
        { method: "POST", body: data }
      );
      let cloudRes = await res.json();
      setImageState({ ...imageState, uploadingImg: false });
      return cloudRes.url;
    } catch (error) {
      setImageState({ ...imageState, uploadingImg: false });
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const image = imageState.image;
    if (!image) return alert("Please upload profile picture");
    const url = await uploadImage(image);
    const userObj = { imageURL: url, ...formdata };
    console.log(userObj);
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
        <Col
          md={7}
          className='d-flex align-items-center justify-content-center flex-direction-column'
        >
          <Form onSubmit={handleSignup} style={{ width: "80%", maxWidth: 500 }}>
            <h1 className='text-center'>Create account</h1>
            <div className='signup-profile-pic__container'>
              <img
                src={imageState.imagePreview || bot}
                className='signup-profile-pic'
                alt='profile pic'
              />
              <label htmlFor='image-upload' className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input
                type='file'
                id='image-upload'
                accept='image/*'
                hidden
                onChange={validateImg}
              />
            </div>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter your name'
                value={formdata.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
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
                value={formdata.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              {imageState.uploadingImg ? "Signing you up.." : "Signup"}
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

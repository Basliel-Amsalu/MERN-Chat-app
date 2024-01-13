import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";
import { useSelector } from "react-redux";
import { AppContext } from "../appContext/context";

const MessageForm = () => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMsg,
    setPrivateMemeberMsg,
    rooms,
    setRooms,
    newMessages,
    setNewMessages,
  } = useContext(AppContext);

  const getFormatedate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  const todayDate = getFormatedate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log(roomMessages);
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  return (
    <>
      <div className='messages-output'>
        {!user && <div className='alert alert-danger'>Please Login</div>}

        {user &&
          messages.length >= 0 &&
          messages.map(({ _id: date, messagesByDate }, index) => (
            <div key={index}>
              <p className='alert alert-info text-center message-data-indicated'>
                {date}
              </p>
              {messagesByDate?.map(({ content, time, from: sender }, idx) => (
                <div className='message' key={idx}>
                  <p>{content}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='your message'
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant='primary'
              type='submit'
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className='fas fa-paper-plane'></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;

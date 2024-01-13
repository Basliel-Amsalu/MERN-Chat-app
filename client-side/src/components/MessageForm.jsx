import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";
import { useSelector } from "react-redux";
import { AppContext } from "../appContext/context";

const MessageForm = () => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const { socket, currentRoom, messages, setMessages, privateMemberMsg } =
    useContext(AppContext);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messageEndRef = useRef(null);

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

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className='messages-output'>
        {user && !privateMemberMsg?._id && (
          <div className='alert alert-info'> you are in the {currentRoom} </div>
        )}
        {user && privateMemberMsg?._id && (
          <div className='alert alert-info conversation-info'>
            <span>
              {/* Your conversation with {privateMemberMsg.name}{" "} */}
              {currentRoom}
              <img
                src={privateMemberMsg.picture}
                className='conversation-profile-pic'
                alt='priv-img'
              />
            </span>
          </div>
        )}
        {!user && <div className='alert alert-danger'>Please Login</div>}

        {user &&
          messages.length >= 0 &&
          messages.map(({ _id: date, messagesByDate }, index) => (
            <div key={index}>
              <p className='alert alert-info text-center message-date-indicator'>
                {date}
              </p>
              {messagesByDate?.map(({ content, time, from: sender }, idx) => (
                <div
                  className={
                    sender?.email === user?.email
                      ? "message"
                      : "incoming-message"
                  }
                  key={idx}
                >
                  <div className='message-inner'>
                    <div className='d-flex align-items-center mb-3'>
                      <img
                        src={sender.picture}
                        alt='img'
                        style={{
                          width: 35,
                          height: 35,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: 10,
                        }}
                      />
                      <p className='message-sender'>
                        {sender._id === user?._id ? "You" : sender.name}
                      </p>
                    </div>
                    <p className='message-content'>{content}</p>
                    <p className='message-timestamp-left'>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
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

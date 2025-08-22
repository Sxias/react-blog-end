import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JoinForm = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  function changeValue(e) {}

  async function submitJoin(e) {
    e.preventDefault(); // 새로고침 막기 (action 발동 막기)
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitJoin}>
        회원가입
      </Button>
    </Form>
  );
};

export default JoinForm;

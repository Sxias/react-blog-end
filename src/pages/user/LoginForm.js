import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  async function submitLogin(e) {
    e.preventDefault();
  }

  const changeValue = (e) => {};

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
      <Button variant="primary" type="submit" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;

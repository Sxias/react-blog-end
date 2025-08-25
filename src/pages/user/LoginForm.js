import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // reducer 호출

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function submitLogin(e) {
    e.preventDefault();

    try {
      let response = await axios({
        method: "POST",
        url: "http://localhost:8080/login",
        data: user, // axios는 JS Object를 전달하면 JSON으로 변환해서 전달
        headers: {
          "Content-Type": "application/json",
        },
      });

      let jwt = response.headers.authorization;
      localStorage.setItem("jwt", jwt);
      dispatch(login(jwt));
      navigate("/");
    } catch (error) {
      // console.log(error);
      alert(error.response.data.msg);
    }
  }

  const changeValue = (e) => {
    // 유효성 검사

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

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

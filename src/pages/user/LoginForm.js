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
      if (error.response) {
        // 서버가 응답했지만 에러 코드 (400, 401, 500 등)
        alert(error.response.data.msg || "로그인 실패");
      } else if (error.request) {
        // 요청은 갔지만 응답이 없음 (CORS 문제, 서버 꺼짐 등)
        alert("서버 응답이 없습니다. 서버 상태를 확인하세요.");
      } else {
        // 그 외 (axios 설정 문제 등)
        alert("로그인 요청 중 오류 발생: " + error.message);
      }
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.jwt);

  const [board, setBoard] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function updateSubmit(e) {
    e.preventDefault();

    try {
      await axios({
        method: "PUT",
        url: `http://localhost:8080/api/boards/${id}`,
        data: board,
        headers: {
          Authorization: jwt,
        },
      });
      navigate(`/board/${id}`);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  async function fetchUserInfo() {
    let response = await axios({
      method: "GET",
      url: `http://localhost:8080/api/boards/${id}`,
      headers: {
        Authorization: jwt,
      },
    });
    let responseBody = response.data;
    setBoard({
      title: responseBody.body.title,
      content: responseBody.body.content,
    });
  }

  console.log(board);

  return (
    <div>
      <h1>글수정</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={board.title}
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={changeValue}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            row={5}
            value={board.content}
            name="content"
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updateSubmit}>
          글수정
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;

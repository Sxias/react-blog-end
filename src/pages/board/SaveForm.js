import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SaveForm = (props) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({});

  async function submitPost(e) {
    e.preventDefault();
  }

  function changeValue(e) {}

  return (
    <div>
      <h1>글쓰기</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
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
            name="content"
            onChange={changeValue}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitPost}>
          글등록
        </Button>
      </Form>
    </div>
  );
};

export default SaveForm;

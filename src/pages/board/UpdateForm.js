import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateForm = (props) => {
  const { id } = 1;
  const navigate = useNavigate();

  const [board, setBoard] = useState({});

  async function updateSubmit(e) {
    e.preventDefault();
  }

  const changeValue = (e) => {};

  async function fetchUserInfo() {}

  return (
    <div>
      <h1>글수정</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={"제목1"}
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
            value={"내용1"}
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

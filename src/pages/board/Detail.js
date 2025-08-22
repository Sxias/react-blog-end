import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Detail = (props) => {
  const { id } = 1;
  const navigate = useNavigate();
  const [board, setBoard] = useState({});

  async function fetchDetail(boardId) {}

  async function fetchDelete(boardId) {}

  return (
    <div>
      <Link to={`/update-form/${board.id}`} className="btn btn-warning">
        수정
      </Link>
      <Button className="btn btn-danger" onClick={() => fetchDelete(board.id)}>
        삭제
      </Button>
      <br />
      <br />
      <h1>제목1</h1>
      <hr />
      <div>내용1</div>
    </div>
  );
};

export default Detail;

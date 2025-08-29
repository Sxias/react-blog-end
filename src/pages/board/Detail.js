import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReplyItem from "../../components/ReplyItem";

const Detail = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.jwt);
  const [board, setBoard] = useState({
    id: undefined,
    title: "",
    content: "",
    userId: undefined,
    username: "",
    owner: false,
    replies: [],
  });
  const [reply, setReply] = useState({
    comment: "",
    boardId: id,
  });

  async function fetchDetail(boardId) {
    let response = await axios({
      method: "get",
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });

    let responseBody = response.data;
    setBoard(responseBody.body);
  }

  function notifyDeleteReply(replyId) {
    let newReplies = board.replies.filter((reply) => reply.id !== replyId);
    board.replies = newReplies;
    setBoard({ ...board });
  }

  useEffect(() => {
    fetchDetail(id);
  }, []);

  async function fetchDelete(boardId) {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/boards/${boardId}`,
      headers: {
        Authorization: jwt,
      },
    });
    navigate("/");
  }

  function changeValue(e) {
    setReply({ ...reply, [e.target.name]: e.target.value });
  }

  async function submitReply(e) {
    e.preventDefault();

    let response = await axios({
      method: "post",
      url: `http://localhost:8080/api/boards`,
      data: reply,
      headers: {
        Authorization: jwt,
      },
    });

    let responseBody = response.data;
    board.replies = [responseBody, ...board.replies];
    setBoard({ ...board });
  }

  return (
    <div>
      {board.owner ? (
        <>
          {/* id로 통신을 해도 되고, props로 담아서 들고가도 됨 */}
          <Link to={`/update-form/${board.id}`} className="btn btn-warning">
            수정
          </Link>
          <Button
            className="btn btn-danger"
            onClick={() => fetchDelete(board.id)}
          >
            삭제
          </Button>
        </>
      ) : (
        <></>
      )}

      <br />
      <br />
      <h1>{board.title}</h1>
      <hr />
      <div>{board.content}</div>
      {/* 댓글 입력 폼 */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={""}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="댓글을 입력하세요..."
                name="comment"
                value={reply.comment}
                onChange={changeValue}
              />
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="primary" type="submit" onClick={submitReply}>
                댓글 작성
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* 댓글 목록 */}
      <div className="comment-list">
        {board.replies.length > 0 ? (
          board.replies.map((reply) => (
            <ReplyItem reply={reply} notifyDeleteReply={notifyDeleteReply} />
          ))
        ) : (
          <p className="text-muted">아직 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Detail;

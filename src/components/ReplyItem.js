import axios from "axios";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ReplyItem = (props) => {
  const { reply, notifyDeleteReply } = props;
  const jwt = useSelector((state) => state.jwt);

  async function deleteReply(replyId) {
    console.log("jwt in Redux:", jwt); // "Bearer ..." 형태인지 확인
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/replies/${replyId}`,
      headers: {
        Authorization: jwt,
      },
    });
    notifyDeleteReply(replyId);
  }
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <div className="d-flex align-items-center mb-2">
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold">{reply.username}</h6>
              </div>
            </div>
            <p className="mb-2">{reply.comment}</p>
          </div>

          {reply.owner && (
            <Button variant="danger" onClick={() => deleteReply(reply.id)}>
              삭제
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;

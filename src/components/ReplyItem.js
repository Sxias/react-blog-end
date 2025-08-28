import React from "react";
import { Card, Button } from "react-bootstrap";

const ReplyItem = ({
  id,
  comment,
  userId,
  username,
  owner = false,
  onDelete,
}) => {
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <div className="d-flex align-items-center mb-2">
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold">{username}</h6>
              </div>
            </div>
            <p className="mb-2">{comment}</p>
          </div>

          {owner && (
            <Button variant="danger" onClick={() => onDelete?.(id)}>
              삭제
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;

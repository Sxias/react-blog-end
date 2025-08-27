import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BoardItem = (props) => {
  const { id, title } = props;
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Link to={`/board/${id}`} variant="primary" className="btn btn-primary">
          상세보기
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BoardItem;

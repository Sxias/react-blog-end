import React, { useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";

const Home = () => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [model, setModel] = useState({});

  async function apiHome() {}

  function changeValue(e) {}

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={""}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={keyword}
          onChange={changeValue}
        />
      </Form>

      <BoardItem key={1} id={1} title={"제목1"} page={0} />

      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item onClick={""} disabled={false}>
            Prev
          </Pagination.Item>

          <Pagination.Item onClick={""} disabled={false}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useRef, useState } from "react";
import { Form, FormControl, Pagination } from "react-bootstrap";
import BoardItem from "../../components/BoardItem";
import axios from "axios";
import _ from "lodash";

const Home = () => {
  const [page, setPage] = useState(0);

  // 1) 입력 즉시 DOM 반영용
  const [rawKeyword, setRawKeyword] = useState("");

  // 2) 요청 트리거용(디바운스 후 반영)
  const [keyword, setKeyword] = useState("");

  const [model, setModel] = useState({
    totalPage: undefined,
    number: 0,
    isFirst: true,
    isLast: false,
    boards: [],
  });

  // 🔹 rawKeyword가 바뀔 때마다 600ms 뒤에 keyword 반영 (디바운스)
  useEffect(() => {
    const t = setTimeout(() => {
      setKeyword(rawKeyword);
    }, 600);

    return () => clearTimeout(t); // 입력이 다시 들어오면 이전 타이머 취소
  }, [rawKeyword]);

  useEffect(() => {
    apiHome();
  }, [page, keyword]);

  async function apiHome() {
    let response = await axios({
      method: "get",
      url: `http://localhost:8080?page=${page}&keyword=${keyword}`,
    });

    let responseBody = response.data;
    setModel(responseBody.body);
  }

  function prev() {
    setPage((p) => p - 1);
  }

  function next() {
    setPage((p) => p + 1);
  }

  // --- 입력은 즉시 rawKeyword에 반영, 서버요청은 디바운스 ---
  function changeValue(e) {
    const value = e.target.value;
    setRawKeyword(value); // 즉시 DOM 갱신
  }

  return (
    <div>
      <Form className="d-flex mb-4" onSubmit={(e) => e.preventDefault()}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={rawKeyword} // ✅ 입력은 즉시 보이도록 rawKeyword 바인딩
          onChange={changeValue}
        />
      </Form>

      {model.boards.map((board) => (
        <BoardItem key={board.id} id={board.id} title={board.title} page={0} />
      ))}

      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item onClick={prev} disabled={model.isFirst}>
            Prev
          </Pagination.Item>
          <Pagination.Item onClick={next} disabled={model.isLast}>
            Next
          </Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default Home;

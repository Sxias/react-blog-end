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

  // --- 디바운스된 setter: 최초 1회 생성, 언마운트 시 cancel ---
  const debouncedSetKeyword = useRef(
    _.debounce((value) => {
      setKeyword(value); // 디바운스 후에만 서버요청 트리거 상태 변경
      setPage(0); // 새 키워드면 페이지를 0으로 리셋 (옵션)
    }, 600) // 3초가 너무 길다면 600~800ms 권장
  );

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 디바운스 타이머 취소
      debouncedSetKeyword.current.cancel();
    };
  }, []);

  // --- 서버 호출: page, keyword(디바운스된 값) 변경 시에만 ---
  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const res = await axios.get("http://localhost:8080", {
          params: { page, keyword },
          cancelToken: source.token,
        });
        setModel(res.data.body);
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error(e);
        }
      }
    })();

    // 의존성 변경/언마운트 시 이전 요청 취소
    return () => source.cancel("request aborted due to new search");
  }, [page, keyword]);

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
    debouncedSetKeyword.current(value); // 요청은 지연
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

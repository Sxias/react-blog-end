import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./pages/board/Detail";
import Home from "./pages/board/Home";
import SaveForm from "./pages/board/SaveForm";
import UpdateForm from "./pages/board/UpdateForm";
import JoinForm from "./pages/user/JoinForm";
import LoginForm from "./pages/user/LoginForm";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/save-form" element={<SaveForm />} />
          <Route path="/board/:id" element={<Detail />} />
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/join-form" element={<JoinForm />} />
          <Route path="/update-form/:id" element={<UpdateForm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

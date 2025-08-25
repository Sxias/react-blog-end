import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

function Header(props) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  async function logoutEvent() {
    await localStorage.removeItem("jwt");
    dispatch(logout());
  }

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" className="navbar-brand">
          블로그홈
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLogin ? (
              <>
                <Link to="/save-form" className="nav-link">
                  글쓰기
                </Link>
                <Link className="nav-link" onClick={logoutEvent}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <Link to="/login-form" className="nav-link">
                  로그인
                </Link>
                <Link to="/join-form" className="nav-link">
                  회원가입
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
}

export default Header;

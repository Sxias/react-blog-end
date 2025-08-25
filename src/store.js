// 전역 상태 관리 (user)

// 1. 초기 상태
const initialState = {
  isLogin: false,
  jwt: "",
};

// 2. reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        jwt: action.jwt,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        jwt: "",
      };
    default:
      return state;
  }
};

// 3. action
export function login(jwt) {
  return {
    type: "LOGIN",
    jwt: jwt,
  };
}

export function logout() {
  return {
    type: "LOGOUT",
  };
}

export default reducer;

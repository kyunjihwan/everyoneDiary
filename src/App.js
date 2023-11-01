import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Join from "./pages/Join";
import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import React from "react";

export const MemberStateContext = React.createContext();
export const MemberDispatcherContext = React.createContext();
export const LoginMemberStateContext = React.createContext();
export const LoginMemberDispatcherContext = React.createContext();

// memberList 관리하는 dispatch
function reducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...state, action.data];
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("memberList", JSON.stringify(newState));
  return newState;
}

function App() {
  // memberList reducer
  // 초기화 시 더미데이터 가져오기
  const [state, dispatch] = useReducer(reducer, []);
  const [loginMember, setLoginMember] = useState({});
  // 로그인 확인
  const [isLogin, setIsLogin] = useState(false);

  // Mount 시에 localStorage에 있는 memberList 데이터 가져오기
  useEffect(() => {
    const localMemberData = localStorage.getItem("memberList");
    if (localMemberData) {
      const memberList = JSON.parse(localMemberData);
      if (memberList.length >= 1) {
        dispatch({ type: "INIT", data: memberList });
      }
    }
  }, []);

  // 회원가입 기능
  const onCreate = useCallback((member) => {
    dispatch({
      type: "CREATE",
      data: {
        id: member.id,
        nick: member.nick,
        password: member.password,
        email: member.email,
        phone: member.phone,
      },
    });
  }, []);

  // member
  // Mount 시에 localStorage에 있는 로그인(member) 데이터 가져오기
  useEffect(() => {
    const localLoginData = localStorage.getItem("member");
    if (localLoginData) {
      const loginMemberData = JSON.parse(localLoginData);
      setLoginMember(loginMemberData);
      setIsLogin(true);
    }
  }, []);

  // 로그인
  const login = useCallback((memberList, loginData) => {
    memberList.map((it) => {
      if (it.id === loginData.id) {
        if (parseInt(it.password) === parseInt(loginData.password)) {
          localStorage.setItem("member", JSON.stringify(it));
          setLoginMember(it);
          setIsLogin(true);
        }
      }
    });
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    localStorage.removeItem("member");
    setLoginMember({});
    setIsLogin(false);
  }, []);

  return (
    <div className="App">
      <MemberStateContext.Provider value={state}>
        <MemberDispatcherContext.Provider value={{ onCreate }}>
          <LoginMemberStateContext.Provider value={loginMember}>
            <LoginMemberDispatcherContext.Provider value={{ logout, login }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home isLogin={isLogin} />} />
                  <Route path="/diary" element={<Diary></Diary>} />
                  <Route path="/join" element={<Join></Join>} />
                </Routes>
              </BrowserRouter>
            </LoginMemberDispatcherContext.Provider>
          </LoginMemberStateContext.Provider>
        </MemberDispatcherContext.Provider>
      </MemberStateContext.Provider>
    </div>
  );
}

export default App;

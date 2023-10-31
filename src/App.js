import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { type } from "@testing-library/user-event/dist/type";

const dummyData = [
  {
    id: "user01",
    nick: "user01",
    password: 1234,
    email: "a@a.com",
    phone: "01000000000",
  },
  {
    id: "user02",
    nick: "user02",
    password: 12345,
    email: "a@a.com",
    phone: "01000000000",
  },
  {
    id: "user03",
    nick: "user03",
    password: 123456,
    email: "a@a.com",
    phone: "01000000000",
  },
  {
    id: "user04",
    nick: "user04",
    password: 1234567,
    email: "a@a.com",
    phone: "01000000000",
  },
];

export const MemberStateContext = React.createContext();
export const MemberDispatcherContext = React.createContext();

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
  const [state, dispatch] = useReducer(reducer, dummyData);

  // Mount 시에 localStorage에 있는 데이터 가져오기
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

  return (
    <div className="App">
      <MemberStateContext.Provider value={state}>
        <MemberDispatcherContext.Provider value={{ onCreate }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary" element={<Diary></Diary>} />
              <Route path="/join" element={<Join></Join>} />
            </Routes>
          </BrowserRouter>
        </MemberDispatcherContext.Provider>
      </MemberStateContext.Provider>
    </div>
  );
}

export default App;

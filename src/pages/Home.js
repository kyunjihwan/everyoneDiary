import { useState, useRef, useContext, useEffect } from "react";
import HomeLogin from "../components/HomeLogin";
import HomeMenu from "../components/HomeMenu";
import { LoginMemberStateContext } from "../App";

const Home = ({ isLogin }) => {
  // useContext에 있는 member 데이터 가져오기
  const loginMember = useContext(LoginMemberStateContext);

  return (
    <div className="Home">
      <h2>모두의 다이어리</h2>
      {isLogin ? <HomeMenu /> : <HomeLogin />}
    </div>
  );
};

export default Home;

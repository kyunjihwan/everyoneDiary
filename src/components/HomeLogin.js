import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginMemberDispatcherContext, MemberStateContext } from "../App";

const HomeLogin = () => {
  // 로그인 input state
  const [loginData, setLogin] = useState({
    id: "",
    password: "",
  });

  // useNavigate
  const navigate = useNavigate();

  // 전역에 있는 memberList 가져오기
  const memberList = useContext(MemberStateContext);
  const { login } = useContext(LoginMemberDispatcherContext);

  // 로그인 클릭 시 핸들러
  const handleLogin = () => {
    login(memberList, loginData);
  };
  return (
    <div className="HomeLogin">
      <input
        type="text"
        value={loginData.id}
        onChange={(e) => {
          setLogin({
            ...loginData,
            id: e.target.value,
          });
        }}
      />
      <input
        type="password"
        value={loginData.password}
        onChange={(e) => {
          setLogin({
            ...loginData,
            password: e.target.value,
          });
        }}
      />
      <div className="btn-area">
        <button onClick={handleLogin}>로그인</button>
        <button
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default HomeLogin;

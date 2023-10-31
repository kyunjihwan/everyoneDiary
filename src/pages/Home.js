import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MemberStateContext } from "../App";

const Home = () => {
  // 로그인 state
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });

  // useNavigate
  const navigate = useNavigate();

  // useContext
  const memberList = useContext(MemberStateContext);

  const handleLogin = () => {
    console.log(memberList);
    memberList.map((it) => {
      if (it.id === login.id) {
        if (parseInt(it.password) === parseInt(login.password)) {
          localStorage.setItem("member", JSON.stringify(it));
          navigate("/diary");
        }
      }
    });
  };
  return (
    <div className="Home">
      <h2>Home</h2>
      <input
        type="text"
        value={login.id}
        onChange={(e) => {
          setLogin({
            ...login,
            id: e.target.value,
          });
        }}
      />
      <input
        type="password"
        value={login.password}
        onChange={(e) => {
          setLogin({
            ...login,
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

export default Home;

import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MemberDispatcherContext, MemberStateContext } from "../App";

const Join = () => {
  // 로그인 state
  const [join, setJoin] = useState({
    id: "",
    password: "",
    nick: "",
    email: "",
    phone: "",
  });

  // useNavigate
  const navigate = useNavigate();

  // useContext
  const { onCreate } = useContext(MemberDispatcherContext);

  // 회원가입 버튼 핸들러
  const handleSubmit = () => {
    onCreate(join);
    navigate("/");
  };

  return (
    <div className="Join">
      <h2>회원가입</h2>
      <div>
        <span>아이디 : </span>
        <input
          type="text"
          value={join.id}
          onChange={(e) => {
            setJoin({
              ...join,
              id: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <span>닉네임 : </span>
        <input
          type="text"
          value={join.nick}
          onChange={(e) => {
            setJoin({
              ...join,
              nick: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <span>비밀번호 : </span>
        <input
          type="password"
          value={join.password}
          onChange={(e) => {
            setJoin({
              ...join,
              password: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <span>이메일 : </span>
        <input
          type="email"
          value={join.email}
          onChange={(e) => {
            setJoin({
              ...join,
              email: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <span>전화번호 : </span>
        <input
          type="phone"
          value={join.phone}
          onChange={(e) => {
            setJoin({
              ...join,
              phone: e.target.value,
            });
          }}
        />
      </div>
      <div className="btn-area">
        <button onClick={handleSubmit}>회원가입</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default Join;

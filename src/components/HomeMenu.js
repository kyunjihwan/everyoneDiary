import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { LoginMemberDispatcherContext, LoginMemberStateContext } from "../App";
const HomeMenu = () => {
  const { logout } = useContext(LoginMemberDispatcherContext);
  const loginMember = useContext(LoginMemberStateContext);
  return (
    <div className="HomeMenu">
      <div>안녕하세요 {loginMember.nick}님</div>
      <Link to={"/"}>다이어리</Link>
      <Link to={"/diary"}>감정일기</Link>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default HomeMenu;

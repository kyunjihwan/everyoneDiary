import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeLogin from "../components/HomeLogin";
import HomeMenu from "../components/HomeMenu";
import { LoginMemberStateContext } from "../App";

const Home = () => {
  // 로그인 확인
  const [isLogin, setIsLogin] = useState(false);

  // useContext에 있는 member 데이터 가져오기
  const loginMember = useContext(LoginMemberStateContext);

  useEffect(() => {
    if (loginMember) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="Home">
      <h2>Home</h2>
      {isLogin ? <HomeMenu /> : <HomeLogin />}
    </div>
  );
};

export default Home;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryMethodContext } from "../pages/Diary";

const DiaryEditor = () => {
  // useNavigate
  const navigate = useNavigate();

  // useContext에서 onCreate 함수 가져오기
  const { onCreate } = useContext(DiaryMethodContext);

  // 로컬 storage에서 데이터 가져오기
  const member = JSON.parse(localStorage.getItem("member"));

  // 작성자 내용 감정 점수 state
  const [diary, setDiary] = useState({
    author: member.nick,
    content: "",
    emotion: 1,
  });

  // 작성 완료 클릭 시
  const handleSubmit = () => {
    onCreate({
      ...diary,
    });
    setDiary({
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
      <h2>모두의 일기</h2>
      <textarea
        value={diary.content}
        onChange={(e) => {
          setDiary({
            ...diary,
            content: e.target.value,
          });
        }}
      ></textarea>
      <select
        value={diary.emotion}
        onChange={(e) => {
          setDiary({
            ...diary,
            emotion: e.target.value,
          });
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span>오늘의 감정점수:</span>
      <button onClick={handleSubmit}>작성하기</button>
    </div>
  );
};

export default DiaryEditor;

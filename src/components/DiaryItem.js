import { useContext, useState } from "react";
import { DiaryMethodContext } from "../pages/Diary";
import React from "react";

const DiaryItem = ({ diary }) => {
  // 수정 상태 확인
  const [isEdit, setIsEdit] = useState(false);
  // 날짜 변환기
  const date = new Date(diary.date);
  const dateString = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;

  // 전역에 있는 onRemove, onEdit 가져오기
  const { onRemove, onEdit } = useContext(DiaryMethodContext);

  // 수정할 content 상태
  const [newContent, setEditContent] = useState(diary.content);

  // 일기 삭제 버튼 클릭 시 핸들러
  const handleRemove = () => {
    onRemove(diary.id);
  };

  // 일기 수정 완료 버튼 클릭 시 핸들러
  const handleEdit = () => {
    onEdit(newContent, diary.id);
    setIsEdit(!isEdit);
  };

  // 일기 수정 하기, 수정 취소 토글버튼
  const toggleEdit = () => {
    setIsEdit(!isEdit);
    setEditContent(diary.content);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <div>{diary.author}</div>
        {isEdit ? (
          <textarea
            value={newContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          ></textarea>
        ) : (
          <div className="content">{diary.content}</div>
        )}
        <div>{diary.emotion}</div>
        <div className="date">{dateString}</div>
        {isEdit ? (
          <div>
            <button onClick={handleEdit}>수정완료</button>
            <button onClick={toggleEdit}>수정취소</button>
          </div>
        ) : (
          <div>
            <button onClick={toggleEdit}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);

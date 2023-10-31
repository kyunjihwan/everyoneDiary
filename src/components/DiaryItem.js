import { useContext, useState } from "react";
import { DiaryMethodContext } from "../pages/Diary";
import React from "react";

const DiaryItem = ({ diary }) => {
  const [isEdit, setIsEdit] = useState(false);
  const date = new Date(diary.date);
  const dateString = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일`;
  const { onRemove, onEdit } = useContext(DiaryMethodContext);

  const [editContent, setEditContent] = useState(diary.content);

  const handleRemove = () => {
    onRemove(diary.id);
  };

  const handleEdit = () => {
    onEdit(editContent, diary.id);
    setIsEdit(!isEdit);
  };

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
            value={editContent}
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

import { useRef, useReducer, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import DiaryEditor from "../components/DiaryEditor";
import DiaryList from "../components/DiaryList";

export const DiaryMethodContext = React.createContext();

// 일기 목록 상태 관리 reducer
function reducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      newState = action.data;
      return newState;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.targetId ? { ...it, ...action.data } : it
      );
      break;
    }
    default: {
      return state;
    }
  }
  localStorage.setItem("diaryList", JSON.stringify(newState));
  return newState;
}

const Diary = () => {
  const diaryId = useRef(1);
  const [diaryList, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localDiaryData = localStorage.getItem("diaryList");
    if (localDiaryData) {
      const diaryList = JSON.parse(localDiaryData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        diaryId.current = diaryList[0].id + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  // 일기 작성
  const onCreate = useCallback((diary) => {
    const newDiary = {
      id: diaryId.current,
      author: diary.author,
      content: diary.content,
      emotion: diary.emotion,
      date: new Date().getTime(),
    };
    dispatch({ type: "CREATE", data: newDiary });
    diaryId.current += 1;
  }, []);

  // 일기 삭제
  const onRemove = useCallback((targetId) => {
    console.log(`${targetId} 삭제`);
    dispatch({ type: "REMOVE", targetId: targetId });
  }, []);

  // 일기 수정
  const onEdit = useCallback((newContent, targetId) => {
    console.log(`${newContent} + ${targetId}`);
    dispatch({
      type: "EDIT",
      data: { content: newContent },
      targetId: targetId,
    });
  }, []);

  return (
    <div className="">
      <DiaryMethodContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <DiaryEditor />
        <DiaryList diaryList={diaryList} />
      </DiaryMethodContext.Provider>
    </div>
  );
};

export default Diary;

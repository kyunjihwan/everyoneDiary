import { useState, useRef, useMemo } from "react";
import React from "react";
import DiaryEditor from "../components/DiaryEditor";
import DiaryList from "../components/DiaryList";

export const DiaryMethodContext = React.createContext();

const Diary = () => {
  const diaryId = useRef(1);
  const [diaryList, setDiaryList] = useState([]);

  // 일기 작성
  const onCreate = (diary) => {
    const newDiary = {
      id: diaryId.current,
      author: diary.author,
      content: diary.content,
      emotion: diary.emotion,
      date: new Date().getTime(),
    };

    setDiaryList([...diaryList, newDiary]);
    diaryId.current += 1;
  };

  // 일기 삭제
  const onRemove = (diaryId) => {
    console.log(`${diaryId} 삭제`);
    setDiaryList((diaryList) => diaryList.filter((it) => it.id !== diaryId));
  };

  // 일기 수정
  const onEdit = (content, diaryId) => {
    setDiaryList((diaryList) =>
      diaryList.map((it) => {
        return it.id === diaryId ? { ...it, content: content } : it;
      })
    );
  };

  const memoizedDispatches = useMemo(() => {
    return { onRemove, onCreate, onEdit };
  }, []);
  return (
    <div className="">
      <DiaryMethodContext.Provider value={memoizedDispatches}>
        <DiaryEditor onCreate={onCreate} diaryId={diaryId} />
        <DiaryList diaryList={diaryList} />
      </DiaryMethodContext.Provider>
    </div>
  );
};

export default Diary;

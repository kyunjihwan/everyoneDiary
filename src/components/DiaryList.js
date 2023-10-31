import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 목록</h2>
      {diaryList.map((it) => (
        <DiaryItem key={it.id} diary={it} />
      ))}
    </div>
  );
};

export default DiaryList;

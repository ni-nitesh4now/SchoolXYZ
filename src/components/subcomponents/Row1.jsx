import React from 'react';

const LessonRow1 = ({ boardID, boardName, classID, className, streamID, streamName, pubID, pubName, bk, bookName, name }) => {
  return (
    <div className="lessonRow1">
      {boardID && <div className="r1c">{boardName}</div>}
      {(classID || bk) && <div className="r1c">{className}</div>}
      {(streamID || bk) && <div className="r1c">{streamName}</div>}
      {(pubID || bk) && <div className="r1c">{pubName}</div>}
      {boardID && <div className="r1c">{bookName}</div>}
      {name && <div className="r1c">{name}</div>}
    </div>
  );
};

export default LessonRow1;

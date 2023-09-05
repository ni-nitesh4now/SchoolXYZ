import React from 'react';
import { InputGroup } from 'react-bootstrap';

const LessonRow3 = ({ title, handleTitleChange }) => {
  return (
    <div className="lessonRow3">
      <div className="r3c">
        <InputGroup className="mb-3">
          <input
            style={{ resize: "none" }}
            placeholder="Add title"
            className="txtDetail"
            value={title}
            onChange={handleTitleChange}
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default LessonRow3;

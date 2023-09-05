import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const LessonRow4 = ({ description, setObjective }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
      [{ image: "true" }],
      [{ size: ["small", false, "large", "huge"] }], 
    ],
  };

  return (
    <div className="lessonRow4">
      <ReactQuill
        className="custom-textarea"
        value={description}
        onChange={setObjective}
        modules={modules}
        placeholder="Objective"
      />
    </div>
  );
};

export default LessonRow4;

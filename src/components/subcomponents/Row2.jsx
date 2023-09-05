import React from 'react';

const LessonRow2 = ({
  serviceList,
  activeButtonIndex,
  handleButtonClick,
  handleServiceAdd,
}) => {
  return (
    <div className="lessonRow2">
      {serviceList.map((singleService, index) => (
        <div key={index} className="services">
          <div className="second-div">
            <button
              type="button"
              className={`days ${activeButtonIndex === index ? "active" : ""}`}
              onClick={() => handleButtonClick(index)}
            >
              <span>Day {index + 1}</span>
            </button>
          </div>
          {/* {serviceList.length - 1 == index && (
            <div className="first-div">
              {serviceList.length - 1 === index && serviceList.length < 300 && (
                <button
                  type="button"
                  className="add-btn"
                  onClick={handleServiceAdd}
                >
                  <span>+</span>
                </button>
              )}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default LessonRow2;

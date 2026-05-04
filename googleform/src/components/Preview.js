import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewAnswer from "./PreviewAnswer";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeQuestion } = location.state || {};

  const handleBack = () => {
    navigate('/', { state: { returnQuestions: activeQuestion } });
  };

  return (
    <>
      <div className="countainer">
        <h1 className="heading">Preview</h1>
        <div className="BackCon">
          <button onClick={handleBack}>
            Back to Form
          </button>
        </div>
        <div>
          {activeQuestion && activeQuestion.length > 0 ? (
            <PreviewAnswer q={activeQuestion} />
          ) : (
            <p className="noQuestion">No questions to preview. Please add questions first.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Preview;

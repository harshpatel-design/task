import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewAnswer from "./PreviewAnswer";

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeQuestion, form, fromDiscription } = location.state || [];
  console.log("active", activeQuestion);

  const handleBack = () => {
    navigate("/", { state: { returnQuestions: activeQuestion } });
  };

  return (
    <>
      <div className="countainer">
        <div className="heading PreviewHeading">
          <h1 className="">{form.length > 0 ? form : "Untitled form"}</h1>
          <p>{fromDiscription.length > 0 ? fromDiscription : "Description"}</p>
        </div>
        <div className="BackCon">
          <button onClick={handleBack}>Back to Form</button>
        </div>
        <div>
          {activeQuestion && activeQuestion.length > 0 ? (
            <PreviewAnswer q={activeQuestion} />
          ) : (
            <p className="noQuestion">
              No questions to preview. Please add questions first.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Preview;

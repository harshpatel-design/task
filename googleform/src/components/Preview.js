import React from "react";
import { useNavigate } from "react-router-dom";
import PreviewAnswer from "./PreviewAnswer";
import { useSelector } from "react-redux";

function Preview() {
  const { form, activeQuestion, formDescription, titleStyle, descStyle } =
    useSelector((state) => state.questions);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", {
      state: {
        returnQuestions: activeQuestion,
      },
    });
  };

  return (
    <>
      <div className="countainer">
        <div className="heading PreviewHeading">
          <h1
            className={`
              ${titleStyle.bold ? "bold-active" : ""}
              ${titleStyle.italic ? "italic-active" : ""}
              ${titleStyle.underline ? "underline-active" : ""}
            `}
          >
            {form?.length > 0 ? form : "Untitled form"}
          </h1>

          <p
            className={`
              ${descStyle.bold ? "bold-active" : ""}
              ${descStyle.italic ? "italic-active" : ""}
              ${descStyle.underline ? "underline-active" : ""}
            `}
          >
            {formDescription?.length > 0 ? formDescription : "Form Description"}
          </p>
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

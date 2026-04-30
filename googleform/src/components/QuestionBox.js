import React, { useEffect, useState } from "react";
import QuestionRenderer from "./QuestionRenderer";

const QuestionBox = ({
  q,
  editQ,
  setQuestions,
  questions,
  updateOption,
  deleteOption,
  addOption,
  handleAddQuestion,
  handleCopyQuestion,
  setEditQ,
  isEditMode,
  onConfirm,
  activeQuestion,
  setActiveQuestion,
  questionLength,
  setQuestionLength,
}) => {
  const [ques, setQues] = useState("");

  useEffect(() => {
    setQues(q.question || "");
  }, [q]);

  const handleTypeChange = (newType) => {
    const updated = {
      ...q,
      type: newType,
      options: [],
      rows: [],
      cols: [],
      ratingCount: null,
      ratingIcon: null,
      scaleStart: null,
      scaleEnd: null,
      leftLabel: "",
      rightLabel: "",

      ...(newType === "Multiple choice" ||
      newType === "Checkboxes" ||
      newType === "Drop-down"
        ? { options: ["Option 1"] }
        : {}),

      ...(newType.toLowerCase().includes("grid")
        ? { rows: ["Row 1"], cols: ["Column 1"] }
        : {}),

      ...(newType === "Rating" ? { ratingCount: 5, ratingIcon: "⭐" } : {}),

      ...(newType === "Linear scale" ? { scaleStart: 1, scaleEnd: 5 } : {}),
    };

    if (isEditMode) {
      setEditQ(updated);
    } else {
      setQuestions((prev) =>
        prev.map((item) => (item.id === q.id ? updated : item)),
      );
    }
  };

  const handleQuestionChange = (value) => {
    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        question: value,
      }));
    } else {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, question: value } : item,
        ),
      );
    }
  };

  const questionTypes = [
    "Short answer",
    "Paragraph",
    "Multiple choice",
    "Checkboxes",
    "Drop-down",
    "Multiple-choice grid",
    "Tick box grid",
    "Rating",
    "Linear scale",
    "Date",
    "Time",
  ];

  const handleRemoveQuestion = () => {
    if (isEditMode) {
      const id = editQ?.id;

      setActiveQuestion((prev) => {
        if (!Array.isArray(prev)) return [];

        const index = prev.findIndex((item) => item.id === id);
        if (index === -1) return prev;

        if (index.length === 0) {
          setQuestionLength(false);
        }

        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });

      setEditQ(null);
      console.log("harsh");
    } else {
      setQuestions((prev) => {
        const index = prev.findIndex((item) => item.id === q.id);
        setQuestionLength(false);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };

  return (
    <>
      <div className="questionBox active">
        <div className="questionHeader">
          <input
            className="questionInput"
            placeholder="Untitled Question"
            value={ques}
            onChange={(e) => {
              const value = e.target.value;
              setQues(value);
              handleQuestionChange(value);
            }}
          />

          <div className="selectWrapper">
            <select
              value={q.type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              {questionTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="arrow">⌄</span>
          </div>
        </div>

        <QuestionRenderer
          q={q}
          setQuestions={setQuestions}
          questions={questions}
          updateOption={updateOption}
          deleteOption={deleteOption}
          addOption={addOption}
          handleCopyQuestion={handleCopyQuestion}
          isEditMode={isEditMode}
          setEditQ={setEditQ}
        />

        <div className="addCon">
          {isEditMode ? (
            <div className="spanBtn">
              <span className="addBtn confiremBtn" onClick={onConfirm}>
                ✔️
              </span>
              <span
                className="addBtn removeBtn"
                onClick={() => handleRemoveQuestion()}
              >
                ❌
              </span>
              <span
                className="addBtn copyBtn"
                onClick={() => handleCopyQuestion(q)}
              >
                ©️
              </span>
            </div>
          ) : (
            <div className="spanBtn">
              <span
                className="addBtn"
                onClick={() => handleAddQuestion(q.type, q)}
              >
                ➕
              </span>

              <span
                className="addBtn removeBtn"
                onClick={() => handleRemoveQuestion()}
              >
                ❌
              </span>

              <span
                className="addBtn copyBtn"
                onClick={() => handleCopyQuestion(q)}
              >
                ©️
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionBox;

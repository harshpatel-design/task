import React, { useEffect, useState } from "react";
import QuestionRenderer from "./QuestionRenderer";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  setEditQ,
  setActiveQuestion,
  setQuestionLength,
} from "../redux/questionSlice";

const QuestionBox = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  handleAddQuestion,
  handleCopyQuestion,
  isEditMode,
  onConfirm,
}) => {
  const dispatch = useDispatch();

  const { editQ, questions, activeQuestion } = useSelector(
    (state) => state.questions,
  );

  const [localQuestion, setLocalQuestion] = useState(q.question || "");

  useEffect(() => {
    setLocalQuestion(q.question || "");
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
        ? {
            options: ["Option 1"],
          }
        : {}),

      ...(newType.toLowerCase().includes("grid")
        ? {
            rows: ["Row 1"],
            cols: ["Column 1"],
          }
        : {}),

      ...(newType === "Rating"
        ? {
            ratingCount: 5,
            ratingIcon: "⭐",
          }
        : {}),

      ...(newType === "Linear scale"
        ? {
            scaleStart: 1,
            scaleEnd: 5,
          }
        : {}),
    };

    if (isEditMode) {
      dispatch(setEditQ(updated));
    } else {
      const updatedQuestions = questions.map((item) =>
        item.id === q.id ? updated : item,
      );

      dispatch(setQuestions(updatedQuestions));
    }
  };

  const handleQuestionChange = (value) => {
    setLocalQuestion(value);

    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          question: value,
        }),
      );
    } else {
      const updatedQuestions = questions.map((item) =>
        item.id === q.id
          ? {
              ...item,
              question: value,
            }
          : item,
      );

      dispatch(setQuestions(updatedQuestions));
    }
  };

  const handleUpdateOption = (qid, index, value) => {
    if (editQ && editQ.id === qid) {
      dispatch(
        setEditQ({
          ...editQ,
          options: (editQ.options || []).map((opt, i) =>
            i === index ? value : opt,
          ),
        }),
      );
    } else {
      updateOption(qid, index, value);
    }
  };

  const handleDeleteOption = (qid, index) => {
    if (editQ && editQ.id === qid) {
      dispatch(
        setEditQ({
          ...editQ,
          options: (editQ.options || []).filter((_, i) => i !== index),
        }),
      );
    } else {
      deleteOption(qid, index);
    }
  };

  const handleAddOption = (qid) => {
    if (editQ && editQ.id === qid) {
      dispatch(
        setEditQ({
          ...editQ,
          options: [
            ...(editQ.options || []),
            `Option ${(editQ.options || []).length + 1}`,
          ],
        }),
      );
    } else {
      addOption(qid);
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

      if (Array.isArray(activeQuestion)) {
        const updatedActiveQuestions = activeQuestion.filter(
          (item) => item.id !== id,
        );

        dispatch(setActiveQuestion(updatedActiveQuestions));

        if (updatedActiveQuestions.length === 0) {
          dispatch(setQuestionLength(false));
        }
      }

      dispatch(setEditQ(null));
    } else {
      const updatedQuestions = questions.filter((item) => item.id !== q.id);

      dispatch(setQuestions(updatedQuestions));

      if (updatedQuestions.length === 0) {
        dispatch(setQuestionLength(false));
      }
    }
  };

  return (
    <div className="questionBox active">
      <div className="questionHeader">
        <input
          className="questionInput"
          placeholder="Untitled Question"
          value={localQuestion}
          onChange={(e) => handleQuestionChange(e.target.value)}
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
        q={isEditMode ? editQ : q}
        updateOption={handleUpdateOption}
        deleteOption={handleDeleteOption}
        addOption={handleAddOption}
        isEditMode={isEditMode}
      />

      <div className="addCon">
        {isEditMode ? (
          <div className="spanBtn">
            <span className="addBtn confiremBtn" onClick={onConfirm}>
              ✔️
            </span>

            <span className="addBtn removeBtn" onClick={handleRemoveQuestion}>
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

            <span className="addBtn removeBtn" onClick={handleRemoveQuestion}>
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
  );
};

export default QuestionBox;

import "./App.css";
import Heding from "./components/Heding";
import QuestionBox from "./components/QuestionBox";
import QuestionPreview from "./components/QuestionPreview";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  setActiveQuestion,
  setEditQ,
  setQuestionLength,
} from "./redux/questionSlice";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState({});
  const isAnyError = Object.values(hasError).some((item) => item === true);

  const { questions, activeQuestion, editQ, questionLength } = useSelector(
    (state) => state.questions,
  );

  const createQuestionByType = (type) => {
    const safeType = typeof type === "string" ? type : "Short answer";
    return {
      id: Date.now(),
      question: "",
      type: safeType,
      options: [],
      rows: [],
      cols: [],
      ratingCount: null,
      ratingIcon: null,
      scaleStart: null,
      scaleEnd: null,
      leftLabel: "",
      rightLabel: "",

      ...(safeType === "Multiple choice" ||
      safeType === "Checkboxes" ||
      safeType === "Drop-down"
        ? { options: ["Option 1"] }
        : {}),

      ...(safeType.toLowerCase().includes("grid")
        ? { rows: ["Row 1"], cols: ["Column 1"] }
        : {}),

      ...(safeType === "Rating" ? { ratingCount: 5, ratingIcon: "⭐" } : {}),

      ...(safeType === "Linear scale" ? { scaleStart: 1, scaleEnd: 5 } : {}),
    };
  };

  const createNewQuestion = (type = "Short answer") => {
    return createQuestionByType(type);
  };

  const deleteOption = (qid, index) => {
    const updatedQuestions = questions.map((q) =>
      q.id === qid
        ? {
            ...q,
            options: (q.options || []).filter((_, i) => i !== index),
          }
        : q,
    );

    dispatch(setQuestions(updatedQuestions));

    if (editQ && editQ.id === qid) {
      dispatch(
        setEditQ({
          ...editQ,
          options: (editQ.options || []).filter((_, i) => i !== index),
        }),
      );
    }
  };

  const updateOption = (qid, index, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === qid
        ? {
            ...q,
            options: (q.options || []).map((opt, i) =>
              i === index ? value : opt,
            ),
          }
        : q,
    );

    dispatch(setQuestions(updatedQuestions));

    if (editQ && editQ.id === qid) {
      dispatch(
        setEditQ({
          ...editQ,
          options: (editQ.options || []).map((opt, i) =>
            i === index ? value : opt,
          ),
        }),
      );
    }
  };

  const addOption = (qid) => {
    const updatedQuestions = questions.map((q) =>
      q.id === qid
        ? {
            ...q,
            options: [
              ...(q.options || []),
              `Option ${(q.options || []).length + 1}`,
            ],
          }
        : q,
    );

    dispatch(setQuestions(updatedQuestions));

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
    }
  };

  const handleEdit = (q) => {
    dispatch(setActiveQuestion([q]));
  };

  const handleAddQuestion = (type, currentQ) => {
    const updatedQ = questions.find((q) => q.id === currentQ.id);
    dispatch(setActiveQuestion([...activeQuestion, updatedQ]));

    const newBlank = createNewQuestion(type);
    const updatedQuestions = questions.map((q) =>
      q.id === currentQ.id ? newBlank : q,
    );

    dispatch(setQuestions(updatedQuestions));
  };

  const handleCopyQuestion = (q) => {
    const newQ = {
      ...JSON.parse(JSON.stringify(q)),
      id: Date.now(),
    };
    const activeIndex = activeQuestion.findIndex((item) => item.id === q.id);

    const updatedActiveQuestion = [
      ...activeQuestion.slice(0, activeIndex + 1),
      newQ,
      ...activeQuestion.slice(activeIndex + 1),
    ];

    dispatch(setActiveQuestion(updatedActiveQuestion));
  };

  return (
    <div className="App">
      <div className="countainer">
        <Heding />
        <div className="PreviewButton">
          <button
            onClick={() => {
              navigate("/preview");
            }}
          >
            Preview
          </button>
        </div>
        {!questionLength && (
          <div className="emptyState">
            <button
              onClick={() => {
                dispatch(setQuestionLength(true));
                if (questions.length === 0) {
                  setHasError({});
                  dispatch(
                    setQuestions([
                      {
                        id: Date.now(),
                        question: "",
                        type: "Short answer",
                        options: [],
                      },
                    ]),
                  );
                }
              }}
            >
              ➕ Add Question
            </button>
          </div>
        )}

        {Array.isArray(activeQuestion) && activeQuestion.length > 0 && (
          <QuestionPreview
            addOption={addOption}
            handleCopyQuestion={handleCopyQuestion}
            deleteOption={deleteOption}
            setHasError={setHasError}
            hasError={hasError}
            isAnyError={isAnyError}
          />
        )}

        {questionLength &&
          questions.map((q) => (
            <QuestionBox
              key={q.id}
              q={q}
              updateOption={updateOption}
              deleteOption={deleteOption}
              addOption={addOption}
              handleCopyQuestion={handleCopyQuestion}
              handleAddQuestion={handleAddQuestion}
              handleEdit={handleEdit}
              hasError={hasError}
              setHasError={setHasError}
              isAnyError={isAnyError}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

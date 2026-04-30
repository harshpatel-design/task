import { useState } from "react";
import "./App.css";
import Heding from "./components/Heding";
import QuestionBox from "./components/QuestionBox";
import QuestionPreview from "./components/QuestionPreview";

function App() {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: "",
      type: "Short answer",
      options: [],
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState([]);
  const [editQ, setEditQ] = useState(null);

  const [questionLength, setQuestionLength] = useState(true);

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
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: (q.options || []).filter((_, i) => i !== index),
            }
          : q,
      ),
    );
    setEditQ((prev) => {
      if (prev && prev.id === qid) {
        return {
          ...prev,
          options: (prev.options || []).filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  };
  const updateOption = (qid, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: (q.options || []).map((opt, i) =>
                i === index ? value : opt,
              ),
            }
          : q,
      ),
    );

    setEditQ((prev) => {
      if (prev && prev.id === qid) {
        return {
          ...prev,
          options: (prev.options || []).map((opt, i) =>
            i === index ? value : opt,
          ),
        };
      }
      return prev;
    });
  };
  const addOption = (qid) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: [...(q.options || []), `Option ${q.options.length + 1}`],
            }
          : q,
      ),
    );

    setEditQ((prev) => {
      if (prev && prev.id === qid) {
        return {
          ...prev,
          options: [
            ...(prev.options || []),
            `Option ${prev.options.length + 1}`,
          ],
        };
      }
      return prev;
    });
  };

  const handleEdit = (q) => {
    setActiveQuestion([q]);
  };

  const handleAddQuestion = (type, currentQ) => {
    const updatedQ = questions.find((q) => q.id === currentQ.id);

    setActiveQuestion((prev) => [...prev, updatedQ]);
    const newBlank = createNewQuestion(type);

    setQuestions((prev) =>
      prev.map((q) => (q.id === currentQ.id ? newBlank : q)),
    );
  };

  const handleCopyQuestion = (q) => {
    const newQ = JSON.parse(JSON.stringify(q));
    newQ.id = Date.now() + Math.floor(Math.random() * 1000);

    setActiveQuestion((prev) => [...prev, newQ]);
  };

  return (
    <div className="App">
      <div className="countainer">
        <Heding />
        {!questionLength && (
          <div className="emptyState">
            <button
              className=""
              onClick={() => {
                setQuestionLength(true);
                if (questions.length === 0) {
                  setQuestions([
                    {
                      id: Date.now(),
                      question: "",
                      type: "Short answer",
                      options: [],
                    },
                  ]);
                }
              }}
            >
              ➕ Add Question
            </button>
          </div>
        )}
        {Array.isArray(activeQuestion) && activeQuestion.length > 0 && (
          <QuestionPreview
            setQuestionLength={setQuestionLength}
            q={activeQuestion}
            setQuestions={setQuestions}
            questions={questions}
            addOption={addOption}
            editQ={editQ}
            setEditQ={setEditQ}
            handleCopyQuestion={handleCopyQuestion}
            deleteOption={deleteOption}
            setActiveQuestion={setActiveQuestion}
            activeQuestion={activeQuestion}
          />
        )}

        {questionLength &&
          questions.map((q) => (
            <QuestionBox
              key={q.id}
              q={q}
              setQuestions={setQuestions}
              questions={questions}
              updateOption={updateOption}
              deleteOption={deleteOption}
              addOption={addOption}
              handleCopyQuestion={handleCopyQuestion}
              handleAddQuestion={handleAddQuestion}
              handleEdit={handleEdit}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              setEditQ={setEditQ}
              setQuestionLength={setQuestionLength}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

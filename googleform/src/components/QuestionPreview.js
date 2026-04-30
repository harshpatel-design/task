import React, { useState } from "react";
import QuestionBox from "./QuestionBox";

const QuestionPreview = ({
  q,
  setQuestions,
  questions,
  updateOption,
  deleteOption,
  addOption,
  handleCopyQuestion,
  handleAddQuestion,
  editQ,
  setEditQ,
  setActiveQuestion,
  activeQuestion,
  handleAddColLocal,
  handleAddRowLocal,
}) => {
  const [isedit, setIsedit] = useState(false);

  if (!q || q.length === 0) return null;

  const getEmptyIcon = (icon) => {
    switch (icon) {
      case "⭐":
        return "☆";
      case "❤️":
        return "🤍";
      case "👍":
        return "👍";
      default:
        return "☆";
    }
  };

  const handleEdit = (q) => {
    setEditQ(q);
    setIsedit(true);
  };

  const handleConfirmEdit = () => {
    if (!editQ) return;

    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === editQ.id);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = editQ;
      return updated;
    });

    setActiveQuestion((prev) =>
      prev.map((q) => (q.id === editQ.id ? editQ : q)),
    );

    setIsedit(false);
  };
  return (
    <div className="previewContainer">
      {q.map((item) => {
        const type = item.type;

        if (isedit && editQ?.id === item.id) {
          return (
            <QuestionBox
              key={item.id}
              q={editQ}
              editQ={editQ}
              setEditQ={setEditQ}
              setQuestions={setQuestions}
              questions={questions}
              updateOption={updateOption}
              deleteOption={deleteOption}
              addOption={addOption}
              handleCopyQuestion={handleCopyQuestion}
              handleAddQuestion={handleAddQuestion}
              isEditMode={isedit && editQ?.id === item.id}
              onConfirm={handleConfirmEdit}
              setActiveQuestion={setActiveQuestion}
              activeQuestion={activeQuestion}
              
            />
          );
        }

        return (
          <div
            key={item.id}
            className="previewBox"
            onClick={() => handleEdit(item)}
          >
            <h3>{item.question || "Untitled Question"}</h3>

            {type === "Short answer" && (
              <input type="text" disabled placeholder="Short answer text" />
            )}

            {type === "Paragraph" && (
              <textarea disabled placeholder="Long answer text" />
            )}

            {type === "Multiple choice" &&
              (item.options || []).map((opt, i) => (
                <div key={i}>
                  <input type="radio" disabled /> {opt}
                </div>
              ))}

            {type === "Checkboxes" &&
              (item.options || []).map((opt, i) => (
                <div key={i} className="checkBoxOption">
                  <input type="checkbox" disabled /> {opt}
                </div>
              ))}

            {type === "Drop-down" && (
              <select disabled>
                {(item.options || []).map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}

            {type.toLowerCase().includes("grid") && (
              <table className="previewGrid">
                <thead>
                  <tr>
                    <th></th>
                    {(item.cols || []).map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(item.rows || []).map((row, i) => (
                    <tr key={i}>
                      <td>{row}</td>
                      {(item.cols || []).map((_, j) => (
                        <td key={j}>
                          <input
                            type={
                              type === "Tick box grid" ? "checkbox" : "radio"
                            }
                            disabled
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {type === "Rating" && (
              <div className="ratingContainer">
                <div className="ratingScale">
                  {[...Array(item.ratingCount || 5)].map((_, i) => (
                    <div key={i} className="ratingItem">
                      <span className="ratingNumber">{i + 1}</span>
                      <span className="ratingIcon">
                        {getEmptyIcon(item.ratingIcon)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === "Linear scale" && (
              <div className="linearWrapper">
                <span className="linearLabel">{item.leftLabel || "min"}</span>
                <div className="lineCon">
                  <div className="linearNumbers">
                    {[...Array(item.scaleEnd || 5)].map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  <div className="linearRow">
                    {[...Array(item.scaleEnd || 5)].map((_, i) => (
                      <input key={i} type="radio" disabled />
                    ))}
                  </div>
                </div>

                <span className="linearLabel">{item.rightLabel || "max"}</span>
              </div>
            )}

            {type === "Date" && <input type="date" disabled />}
            {type === "Time" && <input type="time" disabled />}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionPreview;

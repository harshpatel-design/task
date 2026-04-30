import React from "react";

const MultipleChoice = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  handleCopyQuestion,
}) => {
  return (
    <>
      {q.options.map((opt, i) => (
        <div className="option" key={i}>
          <input type="radio" disabled />

          <input
            type="text"
            value={opt}
            placeholder={`Option ${i + 1}`}
            onFocus={(e) => e.target.select()}
            onChange={(e) => updateOption(q.id, i, e.target.value)}
          />

          <button className="deleteBtn" onClick={() => deleteOption(q.id, i)}>
            ✕
          </button>
        </div>
      ))}

      <div className="footerBtn">
        <button className="btn add" onClick={() => addOption(q.id)}>
          Add Option
        </button>
        <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
          Copy
        </button>
      </div>
    </>
  );
};
export default MultipleChoice;

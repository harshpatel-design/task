const Checkboxes = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  handleCopyQuestion,
}) => {
  console.log("q", q);

  return (
    <>
      {q.options.map((opt, i) => (
        <div className="option" key={i}>
          <input type="checkbox" disabled />

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
      </div>
    </>
  );
};

export default Checkboxes;

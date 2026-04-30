const LinearScale = ({
  q,
  setQuestions,
  handleCopyQuestion,
  setEditQ,
  isEditMode,
}) => {
  const updateField = (key, value) => {
    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, [key]: value } : item,
        ),
      );
    }
  };

  return (
    <div className="linearScale">
      <div className="scaleRange range">
        <select
          value={q.scaleStart || 0}
          onChange={(e) => updateField("scaleStart", Number(e.target.value))}
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <span>to</span>

        <select
          value={q.scaleEnd || 5}
          onChange={(e) => updateField("scaleEnd", Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="scaleLabels">
        <div className="scaleLabelsBox">
          <span>{q.scaleStart || 1}</span>
          <input
            type="text"
            placeholder="Label (optional)"
            value={q.leftLabel || ""}
            onChange={(e) => updateField("leftLabel", e.target.value)}
          />
        </div>

        <div className="scaleLabelsBox">
          <span>{q.scaleEnd || 5}</span>
          <input
            type="text"
            placeholder="Label (optional)"
            value={q.rightLabel || ""}
            onChange={(e) => updateField("rightLabel", e.target.value)}
          />
        </div>
      </div>
      <div className="footerBtn">
        <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default LinearScale;

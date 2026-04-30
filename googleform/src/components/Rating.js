const Rating = ({
  q,
  setQuestions,
  handleCopyQuestion,
  setEditQ,
  isEditMode,
}) => {
  const handleCountChange = (value) => {
    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        ratingCount: value,
      }));
    } else {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, ratingCount: value } : item,
        ),
      );
    }
  };

  const handleIconChange = (icon) => {
    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        ratingIcon: icon,
      }));
    } else {
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, ratingIcon: icon } : item,
        ),
      );
    }
  };
  const iconsMap = {
    "⭐": "☆",
    "❤️": "🤍",
    "👍": "👍🏻",
  };

  const filled = q.ratingIcon || "⭐";
  const empty = iconsMap[filled] || "☆";

  return (
    <div className="ratingContainer">
      <div className="ratingControls">
        <select
          value={q.ratingCount || 5}
          onChange={(e) => handleCountChange(Number(e.target.value))}
        >
          {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <select
          value={q.ratingIcon || "⭐"}
          onChange={(e) => handleIconChange(e.target.value)}
        >
          <option value="⭐">⭐ Star</option>
          <option value="❤️">❤️ Heart</option>
          <option value="👍">👍 Thumb</option>
        </select>
      </div>

      <div className="ratingScale">
        {[...Array(q.ratingCount || 5)].map((_, i) => (
          <div key={i} className="ratingItem">
            <span className="ratingNumber">{i + 1}</span>
            <span className="ratingIcon">{empty}</span>
          </div>
        ))}
      </div>

      <div className="footerBtn">
        <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default Rating;

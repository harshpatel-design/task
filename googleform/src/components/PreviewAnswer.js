import React, { useState } from "react";

const PreviewAnswer = ({ q }) => {
  const [ratings, setRatings] = useState({});
  if (!q || q.length === 0) return null;

  const handleRatingChange = (questionId, ratingValue) => {
    setRatings((prev) => ({
      ...prev,
      [questionId]: ratingValue,
    }));
  };

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

  return (
    <div className="previewContainer">
      {q.map((item,i) => {
        const type = item.type;
        return (
          <div key={i} className="previewBox previewAnswer">
            <h3>{item.question || "Untitled Question"}</h3>

            {type === "Short answer" && (
              <input type="text" style={{ width: "100%" , fontSize: "16px"}} placeholder="Short answer text" />
            )}

            {type === "Paragraph" && (
              <textarea style={{ width: "100%" , fontSize: "16px"}} placeholder="Long answer text" />
            )}

            {type === "Multiple choice" &&
              (item.options || []).map((opt, i) => (
                <div key={i} className="PreQuestionChoice">
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="radio"
                      name={item.id}
                      style={{ cursor: "pointer" }}
                    />{" "}
                    {opt}
                  </label>
                </div>
              ))}

            {type === "Checkboxes" &&
              (item.options || []).map((opt, i) => (
                <div key={i} className="checkBoxOption PreQuestionChoice">
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name={item.id}
                      style={{ cursor: "pointer" }}
                    />{" "}
                    {opt}
                  </label>
                </div>
              ))}

            {type === "Drop-down" && (
              <select name={item.id} style={{ cursor: "pointer", fontSize: "16px" }}>
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
                            name={
                              type === "Tick box grid"
                                ? `${item.id}_${i}_${j}`
                                : `${item.id}_row_${i}`
                            }
                            style={{ cursor: "pointer", fontSize: "16px" }}
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
                  {[...Array(item.ratingCount || 5)].map((_, i) => {
                    const currentRating = ratings[item.id] || 0;
                    const ratingIcon = item.ratingIcon || "⭐";
                    const isFilled = i < currentRating;

                    return (
                      <div
                        key={i}
                        className="ratingItem"
                        onClick={() => handleRatingChange(item.id, i + 1)}
                        style={{ cursor: "pointer", fontSize: "16px" }}
                      >
                        <span className="ratingNumber">{i + 1}</span>
                        <span className="ratingIcon">
                          {isFilled ? ratingIcon : getEmptyIcon(ratingIcon)}
                        </span>
                      </div>
                    );
                  })}
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
                      <input
                        key={i}
                        type="radio"
                        name={`${item.id}`}
                        style={{ cursor: "pointer", fontSize: "16px" }}
                      />
                    ))}
                  </div>
                </div>

                <span className="linearLabel">{item.rightLabel || "max"}</span>
              </div>
            )}

            {type === "Date" && <input type="date" />}
            {type === "Time" && <input type="time" />}
          </div>
        );
      })}
    </div>
  );
};

export default PreviewAnswer;

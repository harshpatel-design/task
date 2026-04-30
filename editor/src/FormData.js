import React, { useEffect, useRef, useState } from "react";

function FormData() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "Multiple choice",
      question: "",
      options: ["Option 1"],
      answer: null,
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(null);
  const [activeId, setActiveId] = useState(1);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const editRef = useRef(null);

  console.log("question", questions);

  useEffect(() => {
    if (editRef.current) {
      const rect = editRef.current.getBoundingClientRect();
      const isBelowScreen = rect.bottom > window.innerHeight;
      if (isBelowScreen) {
        editRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }
  }, [activeId]);
  const types = [
    "Short answer",
    "Paragraph",
    "Multiple choice",
    "Checkboxes",
    "Drop-down",
    "Linear scale",
    "Rating",
    "Multiple-choice grid",
    "Tick box grid",
    "Date",
    "Time",
  ];

  const addQuestion = () => {
    const newQ = {
      id: Date.now(),
      type: "Multiple choice",
      question: "",
      options: ["Option 1"],
      answer: null,
    };
    setQuestions([...questions, newQ]);
    setActiveId(newQ.id);
    setShowAddBtn(true);
  };

  const handleConfirm = () => {
    setActiveId(questions[questions.length - 1].id);
    setShowAddBtn(true);
  };

  const removeQuestion = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    if (updated.length === 0) {
      const newQ = {
        id: Date.now(),
        type: "Multiple choice",
        question: "",
        options: ["Option 1"],
        answer: "",
      };
      setQuestions([newQ]);
      setActiveId(newQ.id);
    } else {
      setQuestions(updated);
      setActiveId(updated[updated.length - 1].id);
    }
  };

  const copyQuestion = (id) => {
    const q = questions.find((item) => item.id === id);
    const newQ = { ...q, id: Date.now() };
    setQuestions([...questions, newQ]);
    setActiveId(newQ.id);
    setShowAddBtn(false);
  };

  const updateQuestion = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: value } : q)),
    );
  };

  const changeType = (id, type) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              type,
              options: ["Option 1"],
              answer: null,
            }
          : q,
      ),
    );
  };
  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextIndex = (q.options?.length || 0) + 1;
          return {
            ...q,
            options: [...(q.options || []), `Option ${nextIndex}`],
          };
        }
        return q;
      }),
    );
    
  };

  const updateOption = (qid, index, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qid) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const deleteOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const newOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const renderQuestionType = (q) => {
    console.log("q", q);

    switch (q.type) {
      case "Short answer":
        return <input type="text" disabled placeholder="Short answer text" />;

      case "Paragraph":
        return <textarea disabled placeholder="Long answer text" />;

      case "Multiple choice":
        return (
          <>
            {q.options.map((opt, i) => (
              <div className="option" key={i}>
                <input type="radio" disabled />

                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                />

                <button
                  className="deleteBtn"
                  onClick={() => deleteOption(q.id, i)}
                >
                  ✕
                </button>
              </div>
            ))}
           
            <button className="btn add" onClick={() => addOption(q.id)}>
              Add Option
            </button>
          </>
        );

      case "Checkboxes":
        return (
          <>
            {q.options.map((opt, i) => (
              <div className="option" key={i}>
                <input type="checkbox" disabled />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                />
                <button
                  className="deleteBtn"
                  onClick={() => deleteOption(q.id, i)}
                >
                  ✕
                </button>
              </div>
            ))}
           
            <button className="btn add" onClick={() => addOption(q.id)}>
              Add Option
            </button>
          </>
        );

      case "Drop-down":
        return (
          <>
            {q.options.map((opt, i) => (
              <div className="option" key={i}>
                <span>{i + 1}.</span>
                <input
                  className="dropdown"
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                />
                <button
                  className="deleteBtn"
                  onClick={() => deleteOption(q.id, i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button className="btn add" onClick={() => addOption(q.id)}>
              Add Option
            </button>
          </>
        );

      case "Multiple-choice grid":
        return (
          <div className="gridBox">
            <div className="gridHeader"></div>

            <div className="gridBody">
              <div className="gridRows">
                <div>Rows</div>
                {(q.rows || ["Row 1"]).map((row, i) => (
                  <div key={i} className="gridRowItem">
                    {i + 1}.{" "}
                    <input
                      value={row}
                      type="text"
                      onChange={(e) => {
                        const newRows = [...q.rows];
                        newRows[i] = e.target.value;
                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id
                              ? { ...item, rows: newRows }
                              : item,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const currentRows = q.rows || ["Row 1"];
                    const newRows = [
                      ...currentRows,
                      `Row ${currentRows.length + 1}`,
                    ];

                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id ? { ...item, rows: newRows } : item,
                      ),
                    );
                  }}
                >
                  Add row
                </button>
              </div>

              <div className="gridCols">
                <div>Columns</div>
                {(q.cols || ["Column 1"]).map((col, i) => (
                  <div key={i} className="gridRowItem">
                    <input type="radio" disabled />
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => {
                        const newCols = [...q.cols];
                        newCols[i] = e.target.value;
                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id
                              ? { ...item, cols: newCols }
                              : item,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const currentCols = q.cols || ["Column 1"];

                    const newCols = [
                      ...currentCols,
                      `Column ${currentCols.length + 1}`,
                    ];

                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id ? { ...item, cols: newCols } : item,
                      ),
                    );
                  }}
                >
                  Add column
                </button>
              </div>
            </div>
          </div>
        );

      case "Tick box grid":
        return (
          <div className="gridBox">
            <div className="gridBody">
              <div className="gridRows">
                <div>Rows</div>
                {(q.rows || ["Row 1"]).map((row, i) => (
                  <div key={i} className="gridRowItem">
                    {i + 1}.
                    <input
                      value={row}
                      type="text"
                      onChange={(e) => {
                        const newRows = [...(q.rows || ["Row 1"])];
                        newRows[i] = e.target.value;

                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id
                              ? { ...item, rows: newRows }
                              : item,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}

                <button
                  onClick={() => {
                    const currentRows = q.rows || ["Row 1"];
                    const newRows = [
                      ...currentRows,
                      `Row ${currentRows.length + 1}`,
                    ];

                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id ? { ...item, rows: newRows } : item,
                      ),
                    );
                  }}
                >
                  Add row
                </button>
              </div>

              {/* COLUMNS */}
              <div className="gridCols">
                <div>Columns</div>
                {(q.cols || ["Column 1"]).map((col, i) => (
                  <div key={i} className="gridRowItem">
                    <input type="checkbox" disabled />

                    <input
                      type="text"
                      value={col}
                      onChange={(e) => {
                        const newCols = [...(q.cols || ["Column 1"])];
                        newCols[i] = e.target.value;

                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id
                              ? { ...item, cols: newCols }
                              : item,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}

                <button
                  onClick={() => {
                    const currentCols = q.cols || ["Column 1"];
                    const newCols = [
                      ...currentCols,
                      `Column ${currentCols.length + 1}`,
                    ];

                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id ? { ...item, cols: newCols } : item,
                      ),
                    );
                  }}
                >
                  Add column
                </button>
              </div>
            </div>
          </div>
        );

      case "Rating":
        return (
          <div className="ratingContainer">
            <div className="ratingControls">
              <select
                value={q.ratingCount || 5}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setQuestions((prev) =>
                    prev.map((item) =>
                      item.id === q.id ? { ...item, ratingCount: value } : item,
                    ),
                  );
                }}
              >
                {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>

              <select
                value={q.ratingIcon || "⭐"}
                onChange={(e) => {
                  const icon = e.target.value;
                  setQuestions((prev) =>
                    prev.map((item) =>
                      item.id === q.id ? { ...item, ratingIcon: icon } : item,
                    ),
                  );
                }}
              >
                <option value="⭐">⭐ Star</option>
                <option value="❤️">❤️ Heart</option>
                <option value="👍">👍 Thumb</option>
              </select>
            </div>

            <div className="ratingScale">
              {[...Array(q.ratingCount || 5)].map((_, i) => {
                const filled = q.ratingIcon || "⭐";

                const emptyIcons = {
                  "⭐": "☆",
                  "❤️": "🤍",
                  "👍": "👍🏻",
                };

                const empty = emptyIcons[filled] || "☆";

                return (
                  <div key={i} className="ratingItem">
                    <span className="ratingNumber">{i + 1}</span>

                    {/* 🔥 FIX */}
                    <span className="ratingIcon">{empty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "Linear scale":
        return (
          <div className="linearScale">
            <div className="scaleRange range">
              <select
                value={q.scaleStart || 0}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item) =>
                      item.id === q.id
                        ? { ...item, scaleStart: Number(e.target.value) }
                        : item,
                    ),
                  )
                }
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>

              <span>to</span>

              <select
                value={q.scaleEnd || 5}
                onChange={(e) =>
                  setQuestions(
                    questions.map((item) =>
                      item.id === q.id
                        ? { ...item, scaleEnd: Number(e.target.value) }
                        : item,
                    ),
                  )
                }
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
                  onChange={(e) =>
                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id
                          ? { ...item, leftLabel: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </div>

              <div className="scaleLabelsBox">
                <span>{q.scaleEnd || 5}</span>
                <input
                  type="text"
                  placeholder="Label (optional)"
                  value={q.rightLabel || ""}
                  onChange={(e) =>
                    setQuestions(
                      questions.map((item) =>
                        item.id === q.id
                          ? { ...item, rightLabel: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </div>
            </div>
          </div>
        );

      case "Date":
        return <input type="date" className="date" disabled />;

      case "Time":
        return <input type="time" disabled />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="countainer ">
        <div className="questionCon">
          {questions.map((q) =>
            q.id !== activeId ? (
              <div key={q.id} className="questionBox">
                <h3>{q.question || "Untitled Question"}</h3>

                <div className="editBtnCon">
                  <button
                    className="btn edit-btn"
                    onClick={() => {
                      setActiveId(q.id);
                      setShowAddBtn(false);
                    }}
                  >
                    Edit
                  </button>
                </div>

                {q.type === "Multiple choice" &&
                  (q.options || []).map((opt, i) => (
                    <div className="option" key={i}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={q.answer === opt}
                        onChange={() => {
                          setQuestions(
                            questions.map((item) =>
                              item.id === q.id
                                ? { ...item, answer: opt }
                                : item,
                            ),
                          );
                        }}
                      />
                      <span>{opt || `Option ${i + 1}`}</span>
                    </div>
                  ))}

                {q.type === "Checkboxes" &&
                  (q.options || []).map((opt, i) => (
                    <div className="option" key={i}>
                      <input
                        type="checkbox"
                        checked={(q.answer || []).includes(opt)}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          setQuestions(
                            questions.map((item) => {
                              if (item.id === q.id) {
                                let ans = item.answer || [];

                                if (checked) ans = [...ans, opt];
                                else ans = ans.filter((a) => a !== opt);

                                return { ...item, answer: ans };
                              }
                              return item;
                            }),
                          );
                        }}
                      />
                      <span>{opt || `Option ${i + 1}`}</span>
                    </div>
                  ))}

                {q.type === "Drop-down" && (
                  <select
                    value={q.answer || ""}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((item) =>
                          item.id === q.id
                            ? { ...item, answer: e.target.value }
                            : item,
                        ),
                      );
                    }}
                  >
                    <option value="">Select</option>
                    {(q.options || []).map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === "Tick box grid" && (
                  <div className="gridTable">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          {(q.cols || ["Column 1"]).map((col, j) => (
                            <th key={j}>{col}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {(q.rows || ["Row 1"]).map((row, i) => (
                          <tr key={i}>
                            <td>{row}</td>

                            {(q.cols || ["Column 1"]).map((col, j) => (
                              <td key={j}>
                                <input type="checkbox" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {q.type === "Short answer" && (
                  <input
                    type="text"
                    placeholder="Short answer text"
                    value={q.answer || ""}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((item) =>
                          item.id === q.id
                            ? { ...item, answer: e.target.value }
                            : item,
                        ),
                      );
                    }}
                  />
                )}

                {q.type === "Paragraph" && (
                  <textarea
                    placeholder="Long answer text"
                    value={q.answer || ""}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((item) =>
                          item.id === q.id
                            ? { ...item, answer: e.target.value }
                            : item,
                        ),
                      );
                    }}
                  />
                )}
                {q.type === "Date" && (
                  <input
                    type="date"
                    value={q.answer || ""}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((item) =>
                          item.id === q.id
                            ? { ...item, answer: e.target.value }
                            : item,
                        ),
                      );
                    }}
                  />
                )}

                {q.type === "Time" && (
                  <input
                    type="time"
                    value={q.answer || ""}
                    onChange={(e) => {
                      setQuestions(
                        questions.map((item) =>
                          item.id === q.id
                            ? { ...item, answer: e.target.value }
                            : item,
                        ),
                      );
                    }}
                  />
                )}

                {q.type === "Rating" && (
                  <div className="ratingScale">
                    {[...Array(q.ratingCount || 5)].map((_, i) => {
                      const filled = q.ratingIcon || "⭐";

                      const emptyIcons = {
                        "⭐": "☆",
                        "❤️": "🤍",
                        "👍": "👍🏻",
                      };

                      const empty = emptyIcons[filled] || "☆";

                      return (
                        <div key={i} className="ratingItem">
                          <span className="ratingNumber">{i + 1}</span>
                          <span
                            style={{ cursor: "pointer", fontSize: "40px" }}
                            onClick={() => {
                              setQuestions(
                                questions.map((item) =>
                                  item.id === q.id
                                    ? { ...item, answer: i + 1 }
                                    : item,
                                ),
                              );
                            }}
                          >
                            {q.answer !== null && i < q.answer ? filled : empty}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === "Linear scale" && (
                  <div className="linearPreviewWrapper">
                    <span className="scaleText left">{q.leftLabel || ""}</span>

                    <div className="linearPreview">
                      {[
                        ...Array((q.scaleEnd || 5) - (q.scaleStart || 1) + 1),
                      ].map((_, i) => {
                        const val = i + (q.scaleStart || 1);
                        return (
                          <label key={i} className="scaleItem">
                            <input
                              type="radio"
                              name={`scale-${q.id}`}
                              checked={q.answer === val}
                              onChange={() => {
                                setQuestions(
                                  questions.map((item) =>
                                    item.id === q.id
                                      ? { ...item, answer: val }
                                      : item,
                                  ),
                                );
                              }}
                            />
                            <div>{val}</div>
                          </label>
                        );
                      })}
                    </div>

                    <span className="scaleText right">
                      {q.rightLabel || ""}
                    </span>
                  </div>
                )}
                {q.type === "Multiple-choice grid" && (
                  <div className="gridTable">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          {(q.cols || ["Column 1"]).map((col, j) => (
                            <th key={j}>{col}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {(q.rows || ["Row 1"]).map((row, i) => (
                          <tr key={i}>
                            <td>{row}</td>

                            {(q.cols || ["Column 1"]).map((col, j) => (
                              <td key={j}>
                                <input
                                  type="radio"
                                  name={`grid-${q.id}-${i}`}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : null,
          )}

          {questions.map((q, index) =>
            q.id === activeId ? (
              <>
                <div key={q.id} className="questionBox active" ref={editRef}>
                  <div className="questionHeader">
                    <input
                      type="text"
                      className="questionInput"
                      placeholder="Question"
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, e.target.value)}
                    />

                    <div className="questionTypeBox">
                      <div
                        className="selectedType"
                        onClick={() =>
                          setShowDropdown(showDropdown === q.id ? null : q.id)
                        }
                      >
                        {q.type}
                      </div>

                      {showDropdown === q.id && (
                        <div className="dropdownMenu">
                          {types.map((item) => (
                            <div
                              key={item}
                              className="dropdownItem"
                              onClick={() => {
                                changeType(q.id, item);
                                setShowDropdown(null);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="options">{renderQuestionType(q)}</div>

                  <div className="questionFooter">
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="btn remove-btn"
                        onClick={() => removeQuestion(q.id)}
                      >
                        Remove
                      </button>

                      <button
                        className="btn copy-btn"
                        onClick={() => copyQuestion(q.id)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {showAddBtn ? (
                    <div className="addSideBtn" onClick={addQuestion}>
                      <span>➕</span>
                    </div>
                  ) : (
                    <button className="btn addSideBtn" onClick={handleConfirm}>
                      ✔️
                    </button>
                  )}
                </div>
              </>
            ) : null,
          )}
        </div>
      </div>
    </>
  );
}

export default FormData;

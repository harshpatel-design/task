const CheckboxGrid = ({
  q,
  setQuestions,
  questions,
  handleCopyQuestion,
  isEditMode,
  setEditQ,
}) => {
  const handleRowChange = (i, value) => {
    if (isEditMode) {
      setEditQ((prev) => {
        const newRows = [...(prev.rows || ["Row 1"])];
        newRows[i] = value;
        return { ...prev, rows: newRows };
      });
    } else {
      const newRows = [...(q.rows || ["Row 1"])];
      newRows[i] = value;

      setQuestions(
        questions.map((item) =>
          item.id === q.id ? { ...item, rows: newRows } : item,
        ),
      );
    }
  };

  const handleAddRow = () => {
    if (isEditMode) {
      setEditQ((prev) => {
        const currentRows = prev.rows || ["Row 1"];
        return {
          ...prev,
          rows: [...currentRows, `Row ${currentRows.length + 1}`],
        };
      });
    } else {
      const currentRows = q.rows || ["Row 1"];
      const newRows = [...currentRows, `Row ${currentRows.length + 1}`];

      setQuestions(
        questions.map((item) =>
          item.id === q.id ? { ...item, rows: newRows } : item,
        ),
      );
    }
  };

  const handleColChange = (i, value) => {
    if (isEditMode) {
      setEditQ((prev) => {
        const newCols = [...(prev.cols || ["Column 1"])];
        newCols[i] = value;
        return { ...prev, cols: newCols };
      });
    } else {
      const newCols = [...(q.cols || ["Column 1"])];
      newCols[i] = value;

      setQuestions(
        questions.map((item) =>
          item.id === q.id ? { ...item, cols: newCols } : item,
        ),
      );
    }
  };
  const handleAddCol = () => {
    if (isEditMode) {
      setEditQ((prev) => {
        const currentCols = prev.cols || ["Column 1"];
        return {
          ...prev,
          cols: [...currentCols, `Column ${currentCols.length + 1}`],
        };
      });
    } else {
      const currentCols = q.cols || ["Column 1"];
      const newCols = [...currentCols, `Column ${currentCols.length + 1}`];

      setQuestions(
        questions.map((item) =>
          item.id === q.id ? { ...item, cols: newCols } : item,
        ),
      );
    }
  };

  const handleDeleteRow = (index) => {
    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        rows: (prev.rows || []).filter((_, i) => i !== index),
      }));
    } else {
      const newRows = (q.rows || []).filter((_, i) => i !== index);

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, rows: newRows } : item,
        ),
      );
    }
  };

  const handleDeleteCol = (index) => {
    console.log("harsh");

    if (isEditMode) {
      setEditQ((prev) => ({
        ...prev,
        cols: (prev.cols || []).filter((_, i) => i !== index),
      }));
    } else {
      const newCols = (q.cols || []).filter((_, i) => i !== index);

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, cols: newCols } : item,
        ),
      );
    }
  };
  return (
    <div className="gridBox">
      <div className="gridBody">
        <div className="gridRows">
          <h3>Rows</h3>

          {(q.rows || ["Row 1"]).map((row, i) => (
            <div key={i} className="gridRowItem">
              {i + 1}.
              <input
                type="text"
                value={row}
                placeholder={`Row ${i + 1}`}
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleRowChange(i, e.target.value)}
              />
              <span
                className="deleteBtn deleteBtn2"
                onClick={() => handleDeleteRow(i)}
              >
                X
              </span>
            </div>
          ))}

          <button onClick={handleAddRow}>Add row</button>
        </div>

        <div className="gridCols">
          <h3>Columns</h3>

          {(q.cols || ["Column 1"]).map((col, i) => (
            <div key={i} className="gridRowItem">
              <input type="checkbox" className="checkBoxInput" disabled />

              <input
                type="text"
                placeholder={`Column ${i + 1}`}
                onFocus={(e) => e.target.select()}
                value={col}
                onChange={(e) => handleColChange(i, e.target.value)}
              />
              <span
                className="deleteBtn deleteBtn2"
                onClick={() => handleDeleteCol(i)}
              >
                X
              </span>
            </div>
          ))}

          <button onClick={handleAddCol}>Add column</button>
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

export default CheckboxGrid;

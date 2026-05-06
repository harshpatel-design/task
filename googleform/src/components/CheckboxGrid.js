import { useSelector, useDispatch } from "react-redux";
import { setQuestions, setEditQ } from "../redux/questionSlice";

const CheckboxGrid = ({ q, isEditMode }) => {
  const dispatch = useDispatch();

  const { questions, editQ } = useSelector((state) => state.questions);

  const handleRowChange = (i, value) => {
    if (isEditMode) {
      const newRows = [...(editQ?.rows || ["Row 1"])];
      newRows[i] = value;

      dispatch(
        setEditQ({
          ...editQ,
          rows: newRows,
        }),
      );
    } else {
      const newRows = [...(q.rows || ["Row 1"])];
      newRows[i] = value;

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, rows: newRows } : item,
          ),
        ),
      );
    }
  };

  const handleAddRow = () => {
    if (isEditMode) {
      const currentRows = editQ?.rows || ["Row 1"];

      dispatch(
        setEditQ({
          ...editQ,
          rows: [...currentRows, `Row ${currentRows.length + 1}`],
        }),
      );
    } else {
      const currentRows = q.rows || ["Row 1"];

      const newRows = [...currentRows, `Row ${currentRows.length + 1}`];

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, rows: newRows } : item,
          ),
        ),
      );
    }
  };

  const handleColChange = (i, value) => {
    if (isEditMode) {
      const newCols = [...(editQ?.cols || ["Column 1"])];
      newCols[i] = value;

      dispatch(
        setEditQ({
          ...editQ,
          cols: newCols,
        }),
      );
    } else {
      const newCols = [...(q.cols || ["Column 1"])];
      newCols[i] = value;

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, cols: newCols } : item,
          ),
        ),
      );
    }
  };

  const handleAddCol = () => {
    if (isEditMode) {
      const currentCols = editQ?.cols || ["Column 1"];

      dispatch(
        setEditQ({
          ...editQ,
          cols: [...currentCols, `Column ${currentCols.length + 1}`],
        }),
      );
    } else {
      const currentCols = q.cols || ["Column 1"];

      const newCols = [...currentCols, `Column ${currentCols.length + 1}`];

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, cols: newCols } : item,
          ),
        ),
      );
    }
  };

  const handleDeleteRow = (index) => {
    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          rows: (editQ?.rows || []).filter((_, i) => i !== index),
        }),
      );
    } else {
      const newRows = (q.rows || []).filter((_, i) => i !== index);

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, rows: newRows } : item,
          ),
        ),
      );
    }
  };

  const handleDeleteCol = (index) => {
    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          cols: (editQ?.cols || []).filter((_, i) => i !== index),
        }),
      );
    } else {
      const newCols = (q.cols || []).filter((_, i) => i !== index);

      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id ? { ...item, cols: newCols } : item,
          ),
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
    </div>
  );
};

export default CheckboxGrid;

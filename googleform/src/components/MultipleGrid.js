import { useSelector, useDispatch } from "react-redux";
import { setQuestions, setEditQ } from "../redux/questionSlice";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MultipleGrid = ({ q, isEditMode, setHasError }) => {
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
    const currentCols = isEditMode
      ? editQ?.cols || ["Column 1"]
      : q.cols || ["Column 1"];

    const lastCol = currentCols[currentCols.length - 1];

    const lastNumber = parseInt(lastCol?.split(" ")[1] || 0);

    const newCols = [...currentCols, `Column ${lastNumber + 1}`];

    if (isEditMode) {
      dispatch(
        setEditQ({
          ...editQ,
          cols: newCols,
        }),
      );
    } else {
      dispatch(
        setQuestions(
          questions.map((item) =>
            item.id === q.id
              ? {
                  ...item,
                  cols: newCols,
                }
              : item,
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
              <div>
                {i + 1}.
                <Formik
                  initialValues={{
                    row: row,
                  }}
                  validateOnChange={true}
                  validateOnBlur={true}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    row: Yup.string()
                      .min(2, "Minimum 2 characters")
                      .required("Row is required"),
                  })}
                >
                  {({ values, handleChange, errors, validateForm }) => {
                    return (
                      <>
                        <Field
                          type="text"
                          name="row"
                          placeholder={`Row ${i + 1}`}
                          onFocus={(e) => e.target.select()}
                          value={values.row}
                          onChange={async (e) => {
                            handleChange(e);
                            const value = e.target.value;
                            handleRowChange(i, value);
                            const formErrors = await validateForm({
                              row: value,
                            });

                            setHasError((prev) => ({
                              ...prev,
                              [`row-${i}`]: Object.keys(formErrors).length > 0,
                            }));
                          }}
                        />

                        <ErrorMessage
                          name="row"
                          component="p"
                          className="error-row"
                        />
                      </>
                    );
                  }}
                </Formik>
              </div>
              <span
                className="deleteBtn deleteBtn2"
                onClick={() => {
                  setHasError((prev) => {
                    const updated = {
                      ...prev,
                    };

                    delete updated[`row-${i}`];

                    return updated;
                  });

                  handleDeleteRow(i);
                }}
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
              <Formik
                initialValues={{
                  col: col,
                }}
                validateOnChange={true}
                validateOnBlur={true}
                enableReinitialize={true}
                validationSchema={Yup.object({
                  col: Yup.string()
                    .min(2, "Minimum 2 characters")
                    .required("Column is required"),
                })}
              >
                {({ values, handleChange, errors, validateForm }) => {
                  return (
                    <>
                      <div className="colRadio">
                        <input type="radio" disabled />
                        <Field
                          type="text"
                          name="col"
                          value={values.col}
                          placeholder={`Column ${i + 1}`}
                          onFocus={(e) => e.target.select()}
                          onChange={async (e) => {
                            handleChange(e);
                            const value = e.target.value;
                            handleColChange(i, value);
                            const formErrors = await validateForm({
                              col: value,
                            });
                            setHasError((prev) => ({
                              ...prev,
                              [`col-${i}`]: Object.keys(formErrors).length > 0,
                            }));
                          }}
                        />
                      </div>

                      <ErrorMessage
                        name="col"
                        component="p"
                        className="error-row"
                      />
                    </>
                  );
                }}
              </Formik>
              <span
                className="deleteBtn deleteBtn2"
                onClick={() => {
                  setHasError((prev) => {
                    const updated = {
                      ...prev,
                    };

                    delete updated[`col-${i}`];

                    return updated;
                  });

                  handleDeleteCol(i);
                }}
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

export default MultipleGrid;

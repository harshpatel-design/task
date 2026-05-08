import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MultipleChoice = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  setHasError,
}) => {
  return (
    <>
      {q.options.map((opt, i) => (
        <div className="option" key={i}>
          <div className="option-input-container">
            <div style={{ width: "100%" }}>
              <Formik
                initialValues={{
                  option: opt,
                }}
                style={{ flex: 1 }}
                enableReinitialize={true}
                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={Yup.object({
                  option: Yup.string()
                    .min(2, "Minimum 2 characters")
                    .required("Option is required"),
                })}
              >
                {({ values, handleChange, validateForm }) => {
                  return (
                    <>
                      <div className="option-input-container">
                        <input type="radio" disabled />
                        <Field
                          type="text"
                          name="option"
                          value={values.option}
                          placeholder={`Option ${i + 1}`}
                          onFocus={(e) => e.target.select()}
                          onChange={async (e) => {
                            handleChange(e);

                            const value = e.target.value;

                            updateOption(q.id, i, value);

                            const formErrors = await validateForm({
                              option: value,
                            });

                            setHasError((prev) => ({
                              ...prev,
                              [`option-${i}`]:
                                Object.keys(formErrors).length > 0,
                            }));
                          }}
                        />
                      </div>

                      <ErrorMessage
                        name="option"
                        component="div"
                        className="error-2"
                      />
                    </>
                  );
                }}
              </Formik>
            </div>
          </div>

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

export default MultipleChoice;

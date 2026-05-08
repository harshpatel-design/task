import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Checkboxes = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  setHasError,
}) => {
  return (
    <>
      {q.options.map((opt, i) => (
        <div className="option optionCheckbox" key={i}>
          <Formik
            initialValues={{
              option: opt,
            }}
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
                    <input type="checkbox" disabled />
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
                          [`checkbox-${i}`]: Object.keys(formErrors).length > 0,
                        }));
                      }}
                    />
                  </div>

                  <ErrorMessage
                    name="option"
                    component="p"
                    className="error-2"
                  />
                </>
              );
            }}
          </Formik>

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

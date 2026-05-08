import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Dropdown = ({
  q,
  updateOption,
  deleteOption,
  addOption,
  setHasError,
}) => {
  return (
    <>
      {q.options.map((opt, i) => (
        <div className="option option-droop" key={i}>
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
                    <span>{i + 1}.</span>
                    <Field
                      className="dropdown"
                      type="text"
                      name="option"
                      placeholder={`Option ${i + 1}`}
                      onFocus={(e) => e.target.select()}
                      value={values.option}
                      onChange={async (e) => {
                        handleChange(e);

                        const value = e.target.value;

                        updateOption(q.id, i, value);

                        const formErrors = await validateForm({
                          option: value,
                        });

                        setHasError((prev) => ({
                          ...prev,
                          [`dropdown-${i}`]: Object.keys(formErrors).length > 0,
                        }));
                      }}
                    />
                  </div>

                  <ErrorMessage
                    name="option"
                    component="p"
                    className="error-row"
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

export default Dropdown;

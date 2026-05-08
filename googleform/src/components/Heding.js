import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  setForm,
  setFormDescription,
  setActiveField,
  setTitleStyle,
  setDescStyle,
} from "../redux/questionSlice";

function Heding() {
  const dispatch = useDispatch();

  const { form, formDescription, activeField, titleStyle, descStyle } =
    useSelector((state) => state.questions);

  const validationSchema = Yup.object({
    form: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Form title is required"),

    formDescription: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          form: form,
          formDescription: formDescription,
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange }) => (
          <Form>
            <div
              className={`heading ${
                activeField === "title" ||
                activeField === "descriptions"
                  ? "active"
                  : ""
              }`}
            >
              <Field
                type="text"
                name="form"
                className={`hedingForm 
                  ${titleStyle.bold ? "bold-active" : ""} 
                  ${titleStyle.italic ? "italic-active" : ""} 
                  ${titleStyle.underline ? "underline-active" : ""}`}
                placeholder="Untitled form"
                value={values.form}
                onFocus={() => dispatch(setActiveField("title"))}
                onChange={(e) => {
                  handleChange(e);
                  dispatch(setForm(e.target.value));
                }}
              />

              <ErrorMessage name="form" component="p" className="error" />

              {activeField === "title" && (
                <div className="toolbar">
                  <button
                    type="button"
                    className={titleStyle.bold ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setTitleStyle({
                          ...titleStyle,
                          bold: !titleStyle.bold,
                        })
                      )
                    }
                  >
                    B
                  </button>

                  <button
                    type="button"
                    className={titleStyle.italic ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setTitleStyle({
                          ...titleStyle,
                          italic: !titleStyle.italic,
                        })
                      )
                    }
                  >
                    I
                  </button>

                  <button
                    type="button"
                    className={titleStyle.underline ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setTitleStyle({
                          ...titleStyle,
                          underline: !titleStyle.underline,
                        })
                      )
                    }
                  >
                    U
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onMouseDown={() => dispatch(setActiveField(null))}
                  >
                    ✖
                  </button>
                </div>
              )}

              <Field
                type="text"
                name="formDescription"
                className={`hedingDis 
                  ${descStyle.bold ? "bold-active" : ""} 
                  ${descStyle.italic ? "italic-active" : ""} 
                  ${descStyle.underline ? "underline-active" : ""}`}
                placeholder="form discription"
                value={values.formDescription}
                onFocus={() =>
                  dispatch(setActiveField("descriptions"))
                }
                onChange={(e) => {
                  handleChange(e);
                  dispatch(setFormDescription(e.target.value));
                }}
              />

              <ErrorMessage
                name="formDescription"
                component="p"
                className="error"
              />

              {activeField === "descriptions" && (
                <div className="toolbar">
                  <button
                    type="button"
                    className={descStyle.bold ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setDescStyle({
                          ...descStyle,
                          bold: !descStyle.bold,
                        })
                      )
                    }
                  >
                    B
                  </button>

                  <button
                    type="button"
                    className={descStyle.italic ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setDescStyle({
                          ...descStyle,
                          italic: !descStyle.italic,
                        })
                      )
                    }
                  >
                    I
                  </button>

                  <button
                    type="button"
                    className={descStyle.underline ? "active" : ""}
                    onMouseDown={() =>
                      dispatch(
                        setDescStyle({
                          ...descStyle,
                          underline: !descStyle.underline,
                        })
                      )
                    }
                  >
                    U
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onMouseDown={() => dispatch(setActiveField(null))}
                  >
                    ✖
                  </button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Heding;
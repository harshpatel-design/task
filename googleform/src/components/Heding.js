import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

  return (
    <>
      <div
        className={`heading ${activeField === "title" || activeField === "descriptions" ? "active" : ""}`}
      >
        <input
          type="text"
          className={`hedingForm 
    ${titleStyle.bold ? "bold-active" : ""} 
    ${titleStyle.italic ? "italic-active" : ""} 
    ${titleStyle.underline ? "underline-active" : ""}`}
          placeholder="Untitled form"
          value={form}
          onFocus={() => dispatch(setActiveField("title"))}
          onChange={(e) => dispatch(setForm(e.target.value))}
        />

        {activeField === "title" && (
          <div className="toolbar">
            <button
              className={titleStyle.bold ? "active" : ""}
              onMouseDown={() =>
                dispatch(
                  setTitleStyle({
                    ...titleStyle,
                    bold: !titleStyle.bold,
                  }),
                )
              }
            >
              B
            </button>
            <button
              className={titleStyle.italic ? "active" : ""}
              onMouseDown={() =>
                dispatch(
                  setTitleStyle({
                    ...titleStyle,
                    italic: !titleStyle.italic,
                  }),
                )
              }
            >
              I
            </button>
            <button
              className={titleStyle.underline ? "active" : ""}
              onMouseDown={() =>
                dispatch(
                  setTitleStyle({
                    ...titleStyle,
                    underline: !titleStyle.underline,
                  }),
                )
              }
            >
              U
            </button>
            <button
              className="close-btn"
              onMouseDown={() => dispatch(setActiveField(null))}
            >
              ✖
            </button>
          </div>
        )}
        <input
          type="text"
          className={`hedingDis 
    ${descStyle.bold ? "bold-active" : ""} 
    ${descStyle.italic ? "italic-active" : ""} 
    ${descStyle.underline ? "underline-active" : ""}`}
          placeholder="form discription"
          value={formDescription}
          onFocus={() => dispatch(setActiveField("descriptions"))}
          onChange={(e) => dispatch(setFormDescription(e.target.value))}
        />

        {activeField === "descriptions" && (
          <div className="toolbar">
            <button
              className={descStyle.bold ? "active" : ""}
              onMouseDown={() =>
                dispatch(setDescStyle({ ...descStyle, bold: !descStyle.bold }))
              }
            >
              B
            </button>
            <button
              className={descStyle.italic ? "active" : ""}
              onMouseDown={() =>
                dispatch(
                  setDescStyle({ ...descStyle, italic: !descStyle.italic }),
                )
              }
            >
              I
            </button>
            <button
              className={descStyle.underline ? "active" : ""}
              onMouseDown={() =>
                dispatch(
                  setDescStyle({
                    ...descStyle,
                    underline: !descStyle.underline,
                  }),
                )
              }
            >
              U
            </button>
            <button
              className="close-btn"
              onMouseDown={() => dispatch(setActiveField(null))}
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Heding;

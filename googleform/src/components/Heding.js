import React, { useState } from "react";

function Heding() {
  const [form, setForm] = useState("");
  const [fromDiscription, setFromDiscription] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [titleStyle, setTitleStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [descStyle, setDescStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
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
          onFocus={() => setActiveField("title")}
          onChange={(e) => setForm(e.target.value)}
        />

        {activeField === "title" && (
          <div className="toolbar">
            <button
              className={titleStyle.bold ? "active" : ""}
              onMouseDown={() =>
                setTitleStyle({ ...titleStyle, bold: !titleStyle.bold })
              }
            >
              B
            </button>
            <button
              className={titleStyle.italic ? "active" : ""}
              onMouseDown={() =>
                setTitleStyle({ ...titleStyle, italic: !titleStyle.italic })
              }
            >
              I
            </button>
            <button
              className={titleStyle.underline ? "active" : ""}
              onMouseDown={() =>
                setTitleStyle({
                  ...titleStyle,
                  underline: !titleStyle.underline,
                })
              }
            >
              U
            </button>
            <button
              className="close-btn"
              onMouseDown={() => setActiveField(null)}
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
          value={fromDiscription}
          onFocus={() => setActiveField("descriptions")}
          onChange={(e) => setFromDiscription(e.target.value)}
        />

        {activeField === "descriptions" && (
          <div className="toolbar">
            <button
              className={descStyle.bold ? "active" : ""}
              onMouseDown={() =>
                setDescStyle({ ...descStyle, bold: !descStyle.bold })
              }
            >
              B
            </button>
            <button
              className={descStyle.italic ? "active" : ""}
              onMouseDown={() =>
                setDescStyle({ ...descStyle, italic: !descStyle.italic })
              }
            >
              I
            </button>
            <button
              className={descStyle.underline ? "active" : ""}
              onMouseDown={() =>
                setDescStyle({ ...descStyle, underline: !descStyle.underline })
              }
            >
              U
            </button>
            <button
              className="close-btn"
              onMouseDown={() => setActiveField(null)}
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

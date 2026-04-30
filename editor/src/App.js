import { useState } from "react";
import "./App.css";
import FormData from "./FormData";

function App() {
  const [form, setForm] = useState("");
  const [fromDiscription, setFromDiscription] = useState("");
  const [activeField, setActiveField] = useState(null);

  const [style, setStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  return (
    <>
      <div className="app">
        <div className="countainer">
          <div
            className={`heading ${activeField === "title" || activeField === "descriptions" ? "active" : ""}`}
          >
            <input
              type="text"
              className={`hedingForm 
                        ${style.bold ? "bold-active" : ""} 
                        ${style.italic ? "italic-active" : ""} 
                        ${style.underline ? "underline-active" : ""}`}
              placeholder="Untitled form"
              value={form}
              onFocus={() => setActiveField("title")}
              onChange={(e) => setForm(e.target.value)}
            />

            {activeField === "title" && (
              <div className="toolbar">
                <button
                  className={style.bold ? "active" : ""}
                  onMouseDown={() => setStyle({ ...style, bold: !style.bold })}
                >
                  B
                </button>
                <button
                  className={style.italic ? "active" : ""}
                  onMouseDown={() =>
                    setStyle({ ...style, italic: !style.italic })
                  }
                >
                  I
                </button>
                <button
                  className={style.underline ? "active" : ""}
                  onMouseDown={() =>
                    setStyle({ ...style, underline: !style.underline })
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
              className="hedingDis"
              placeholder="form discription"
              value={fromDiscription}
              onFocus={() => setActiveField("descriptions")}
              onChange={(e) => setFromDiscription(e.target.value)}
            />

            {activeField === "descriptions" && (
              <div className="toolbar">
                <button
                  className={style.bold ? "active" : ""}
                  onMouseDown={() => setStyle({ ...style, bold: !style.bold })}
                >
                  B
                </button>
                <button
                  className={style.italic ? "active" : ""}
                  onMouseDown={() =>
                    setStyle({ ...style, italic: !style.italic })
                  }
                >
                  I
                </button>
                <button
                  className={style.underline ? "active" : ""}
                  onMouseDown={() =>
                    setStyle({ ...style, underline: !style.underline })
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
        </div>
      </div>

      <FormData />
    </>
  );
}

export default App;

import React from "react";
const Paragraph = ({ q, handleCopyQuestion }) => {
  return (
    <>
      <textarea className="textBox" disabled placeholder="Long answer text" />
      <div className="footerBtn">
        <button className="btn copy" onClick={() => handleCopyQuestion(q)}>
          Copy{" "}
        </button>
      </div>
    </>
  );
};

export default Paragraph;

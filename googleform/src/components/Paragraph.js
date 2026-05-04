import React from "react";
const Paragraph = ({ q, handleCopyQuestion }) => {
  return (
    <>
      <textarea className="textBox" disabled placeholder="Long answer text" />
    </>
  );
};

export default Paragraph;

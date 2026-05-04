import React from "react";
import { Link } from "react-router-dom";

function Preview() {
  return (
    <>
      <div className="countainer">
        <h1>Preview</h1>
        <Link to="/">
          <button>Back to Form</button>
        </Link>
        <p>Preview functionality will be available once questions are created.</p>
      </div>
    </>
  );
}

export default Preview;

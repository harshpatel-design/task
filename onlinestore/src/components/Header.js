import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const nevigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="logo">
          <h1>Onlinestore</h1>
        </div>

        <ul className="navLinks">
          <li onClick={() => nevigate("/")}>Home</li>
          <li onClick={() =>nevigate("/about")}>About</li>
          <li onClick={() => nevigate("/contact")}>Contact</li>
          <li>
            <button>login</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;

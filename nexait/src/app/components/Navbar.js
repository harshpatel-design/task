"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header className={active ? "active" : ""}>
      <nav className="navbar navbar-dark navbar-expand-lg py-lg-0 px-lg-5 px-0">
        <div className="container header-container">
          <Link href="/" className="navbar-brand">
            <picture>
              <source
                media="(min-width:768px)"
                srcSet="https://nexait.io/assets/images/logo-full.svg"
              />

              <source
                media="(min-width:320px)"
                srcSet="https://nexait.io/assets/images/logo-sm.svg"
              />

              <img
                src="https://nexait.io/assets/images/logo-full.svg"
                alt="Nexait Logo"
                className="img-fluid"
                width={160}
                height={43}
              />
            </picture>
          </Link>

          <div className="me-5 flex flex-1 justify-content-end">
            <ul className="navbar-nav flex flex-row justify-end">
              <li className="nav-item p-5">
                <Link href="/" className="nav-link  p-0">
                  <h3 className="fs-18 fw-600 text-white">About</h3>
                </Link>
              </li>
              <li className="nav-item p-5">
                <Link href="/" className="nav-link p-0">
                  <h3 className="fs-18 fw-600 text-white">Services</h3>
                </Link>
              </li>
              <li className="nav-item p-5">
                <Link href="/" className="nav-link  p-0">
                  <h3 className="fs-18 fw-600 text-white">Portfolio</h3>
                </Link>
              </li>
              <li className="nav-item p-5">
                <Link href="/" className="nav-link  p-0">
                  <h3 className="fs-18 fw-600 text-white">Blog</h3>
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center d-none d-lg-block">
            <Link href="/" className="btn flex items-center">
              <h4 className="fs-18 orange-btn btn px-4 py-2 fw-500 text-white">
                Contact Us
              </h4>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

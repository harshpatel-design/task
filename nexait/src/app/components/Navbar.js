"use client";

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
    <header
      className={
        active ? "active" : "" + "min-[1025px]:bg-transparent bg-black"
      }
    >
      <nav
        className={`navbar navbar-dark navbar-expand-lg min-[1025px]:block hidden ${
          active
            ? "backdrop-blur-0 border-b border-white/10"
            : "backdrop-blur-[5px] border-b-0"
        } transition-all transprent`}
      >
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

      <nav
        className={`navbar navbar-dark navbar-expand-lg min-[1025px]:hidden   h-[77px] ${
          active
            ? "backdrop-blur-0 border-b border-white/10"
            : "backdrop-blur-0 border-b-0"
        } transition-all transprent`}
      >
        <div className="container header-container flex items-center justify-between">
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

          <div className="flex items-center justify-center cursor-pointer h-[51px] w-[51px] rounded-full">
            <svg
              className="text-dark-light bg-[#1F2937] rounded-full"
              width="51"
              height="51"
              viewBox="0 0 56 56"
              fill="none"
            
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="currentColor"></rect>
              <path
                d="M37 32H19M37 24H19"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

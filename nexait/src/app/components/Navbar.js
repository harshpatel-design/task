"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [active, setActive] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [open, setOpen] = useState(false);
  const servicesData = [
    {
      title: "Mobile App",
      icon: `<i class="fa-solid text-xl text-orange-600 fa-mobile-button"></i>`,
      items: [
        "React Native App",
        "Flutter App",
        "Native Android App",
        "Native IOS App",
      ],
    },
    {
      title: "E-commerce Development",
      icon: `<i class="fa-solid text-xl text-orange-600 fa-basket-shopping"></i>`,
      items: ["Magento Development", "Prestashop Development"],
    },
    {
      title: "Web Development",
      icon: `<i class="fa-brands fa-square-web-awesome text-xl text-orange-600"></i>`,
      items: ["Software Development", "Web Application Development"],
    },
    {
      title: "Hire Dedicated Resource",
      icon: `<i class="fa-solid fa-link text-xl text-orange-600"></i>`,
      items: [
        "Hire Dedicated Mobile App Developer",
        "Hire Dedicated Web Developer",
      ],
    },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
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
        onMouseLeave={() => setShowServices(false)}
        className={`navbar navbar-dark navbar-expand-lg  relative min-[992]:block hidden ${
          active ? "backdrop-blur-[5px]" : "backdrop-blur-0"
        } transition-all transparent`}
      >
        <div
          className={`w-full px-[48px] py-[64px] overflow-hidden service-con bg-white text-black absolute top-[76px] left-0 transition-all duration-300 ${
            showServices
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-10"
          }`}
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-4">
              <h1 className="text-black text-[48px] font-extrabold mb-[24px]">
                Made To Scale
              </h1>
              <p className="text-black text-[18px] mb-[16px] w-[80%]">
                Our software development services are built to evolve your
                business idea into a successful growth story
              </p>
              <div className="max-w-[384px] h-[100px] rounded-[16px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://nexait.io/assets/images/services/uiux/uiux-bg-2.webp"
                  alt="UI/UX Background"
                  className="h-full w-full object-cover rounded-[16px]"
                />
              </div>
            </div>

            <div className="col-span-8 ">
              <div className="grid grid-cols-3 ml-[24px] gap-[24px]">
                {servicesData.map((service, index) => (
                  <div key={index} className="col-span-1">
                    <div className="flex items-center gap-[12px] mb-[12px]">
                      {service.icon && (
                        <div
                          className="flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: service.icon }}
                        />
                      )}
                      <h2 className="text-black  min-[1441px]:text-[26px] text-[20px] font-extrabold ">
                        {service.title}
                      </h2>
                    </div>
                    <ul className="list-none p-0 pl-[40px]">
                      {service.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="mb-[8px] cursor-pointer hover:text-[#ED5B2D] font-medium transition-all duration-300"
                        >
                          {item}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                  <h3 className="text-[18px] font-extrabold text-white">
                    About
                  </h3>
                </Link>
              </li>
              <li
                className="nav-item p-5"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <Link href="/" className="nav-link p-0">
                  <h3 className="text-[18px] font-extrabold text-white">
                    Services
                  </h3>
                </Link>
              </li>
              <li className="nav-item p-5">
                <Link href="/" className="nav-link  p-0">
                  <h3 className="text-[18px] font-extrabold text-white">
                    Portfolio
                  </h3>
                </Link>
              </li>
              <li className="nav-item p-5">
                <Link href="/" className="nav-link  p-0">
                  <h3 className="text-[18px] font-extrabold text-white">
                    Blog
                  </h3>
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center d-none d-lg-block">
            <Link href="/" className="btn flex items-center">
              <h4 className="text-[18px] font-extrabold orange-btn btn px-4 py-2 text-white">
                Contact Us
              </h4>
            </Link>
          </div>
        </div>
      </nav>

      <nav
        className={`navbar navbar-dark navbar-expand-lg min-[992px]:hidden items-center flex  h-[77px] ${
          active ? "backdrop-blur-[5px]" : "backdrop-blur-0"
        } transition-all transprent`}
      >
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen grid grid-cols-12 z-5000">
            <div className=" fixed top-0 left-0 w-[80%] min-[426px]:w-[70%] min-[577px]:w-[55%] min-[768px]:w-[40%]  bg-[#111827] min-[577px]:p-[32px] px-[24px] py-[32px] h-screen  flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-[48px]">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="img-fluid w-[120px] h-[33px] object-cover"
                    src="https://nexait.io/assets/images/logo-sm.svg"
                    alt="Nexait Logo"
                  />
                </div>
                <div
                  className="text-white rounded-full"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>

              <ul className="navbar-nav flex flex-col justify-end">
                <li className="nav-item py-5 border-b border-[#0000004d]">
                  <Link href="/" className="nav-link  p-0">
                    <h3 className="min-[577px]:text-[18px] text-[15px] font-extrabold text-[#ffffff]">
                      About
                    </h3>
                  </Link>
                </li>
                <li
                  className={`nav-item py-5 ${openService ? "border-b border-[rgba(128, 132, 141, 0.1)]" : " border-b border-[#0000004d]"} transition-all duration-300`}
                >
                  <Link
                    href="/"
                    className="nav-link p-0 w-full  flex justify-between items-center"
                  >
                    <h3 className="min-[577px]:text-[18px] text-[15px] font-extrabold text-[#ffffff] ">
                      Services
                    </h3>
                    <div
                      className="h-[30px] cursor-pointer w-[30px] flex items-center justify-center"
                      onClick={() => setOpenService(!openService)}
                    >
                      <i
                        className={`fa-solid ${
                          openService ? "fa-minus text-blue-600" : "fa-plus"
                        }`}
                      ></i>
                    </div>
                  </Link>
                </li>

                <li
                  className={`overflow-hidden transition-all duration-300 ${
                    openService ? "max-h-screen py-5" : "max-h-0"
                  }`}
                >
                  <div className="">
                    <div className="grid grid-cols-1 gap-[12px]">
                      {servicesData.map((service, index) => (
                        <div
                          key={index}
                          className="col-span-1 py-[8px] border-b border-[rgba(128, 132, 141, 0.2)]"
                        >
                          <div className="flex items-center gap-[12px] mb-[12px]">
                            {service.icon && (
                              <div
                                className="flex items-center justify-center"
                                dangerouslySetInnerHTML={{
                                  __html: service.icon,
                                }}
                              />
                            )}
                            <h2 className="text-white min-[577]:text-[16px] text-[14px] font-extrabold ">
                              {service.title}
                            </h2>
                          </div>

                          <ul className="list-none p-0 pl-[40px]">
                            {service.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="mb-[8px] min-[577]:text-[12px] text-[11px] tracking-wider cursor-pointer hover:text-[#ED5B2D] font-medium transition-all duration-300"
                              >
                                {item}{" "}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="nav-item py-5 border-b border-[#0000004d]">
                  <Link href="/" className="nav-link  p-0">
                    <h3 className="min-[577px]:text-[18px] text-[15px] font-extrabold text-[#ffffff]">
                      Portfolio
                    </h3>
                  </Link>
                </li>
                <li className="nav-item py-5 border-b border-[#0000004d]">
                  <Link href="/" className="nav-link  p-0">
                    <h3 className="min-[577px]:text-[18px] text-[15px] font-extrabold text-[#ffffff]">
                      Blog
                    </h3>
                  </Link>
                </li>
              </ul>
              <div className="flex items-center w-full lg:block mt-[64px]">
                <Link href="/" className="btn flex items-center w-full">
                  <h4 className="min-[577]:text-[22px] text-[16px] tracking-wider font-extrabold w-full orange-btn btn min-[577px]:px-4 px-2 min-[768px]:py-4 py-2 text-[#ffffff]">
                    Contact Us
                  </h4>
                </Link>
              </div>
            </div>

            <div className="fixed right-0 top-0 w-[20%] min-[426px]:w-[30%] min-[577px]:w-[45%] min-[768px]:w-[60%] h-screen bg-white/30 overflow-hidden pointer-events-none"></div>
          </div>
        )}
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
                width={130}
                height={35}
              />
            </picture>
          </Link>

          <div
            onClick={() => setOpen(true)}
            className="flex items-center justify-center cursor-pointer h-[51px] w-[51px] rounded-full bg-[#1F2937]"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

/* eslint-disable @next/next/no-img-element */
import React from "react";

const footerLinks1 = {
  title: "Useful Resources",
  links: ["About Nexait", "Portfolio", "Blog", "Contact Us"],
};

const footerLinks2 = {
  title: "Useful Resources",
  links: [
    "Mobile App Development",
    "E-commerce Development",
    "Web Development",
    "Software Development",
  ],
};

const footerLinks3 = {
  links: [
    "Web Application Development",
    "Hire Dedicated Mobile App Developer",
    "Hire Dedicated Web Developer",
    "Hire Dedicated Software Developer",
  ],
};

function Footer() {
  return (
    <section className="pt-[64px] min-[]577px:pb-[48px] pb-[38px] bg-black">
      <div className="container">
        <div className=" border-b border-[rgba(17,24,39)] min-[577px]:pb-[64px] pb-[32px]">
          <div className="grid grid-cols-12 justify-between ">
            <div className="min-[992px]:col-span-7 col-span-12 gap-[10px]">
              <div className="grid grid-cols-12 w-full justify-between">
                <div className="flex min-[768px]:col-span-4 col-span-6 flex-col">
                  <ul className="flex flex-col">
                    <li className="mb-[32px]">
                      <h3 className="text-white text-[24px] font-extrabold">
                        {footerLinks1.title}
                      </h3>
                    </li>

                    {footerLinks1.links.map((link, index) => (
                      <li
                        key={index}
                        className=" text-[rgba(156,163,175,1)] transition-colors duration-300 cursor-pointer text-[14px] mb-[8px] hover:text-white"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex min-[768px]:col-span-4 col-span-6 flex-col">
                  <ul className="flex flex-col ">
                    <li className="mb-[32px]">
                      <h3 className="text-white text-[24px] font-extrabold">
                        {footerLinks2.title}
                      </h3>
                    </li>

                    {footerLinks2.links.map((link, index) => (
                      <li
                        key={index}
                        className=" text-[rgba(156,163,175,1)] transition-colors duration-300 cursor-pointer text-[14px] mb-[8px] hover:text-white"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex min-[768px]:col-span-4 col-span-6 flex-col ">
                  <ul className="flex flex-col gap-[8px] mt-[70px]">
                    {footerLinks3.links.map((link, index) => (
                      <li
                        key={index}
                        className=" text-[rgba(156,163,175,1)] transition-colors duration-300 cursor-pointer text-[14px] mb-[8px] hover:text-white"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-12 my-[32px] mb-[48px]">
                  <div className="col-span-12 min-[992px]:hidden min-[768px]:block hidden">
                    <ul className="flex gap-[24px]">
                      <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                        <i className="fa-brands fa-facebook-f text-white text-[16px]"></i>
                      </li>
                      <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                        <i className="fa-brands fa-twitter text-white text-[16px]"></i>
                      </li>
                      <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                        <i className="fa-brands fa-linkedin-in text-white text-[16px]"></i>
                      </li>
                      <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                        <i className="fa-brands fa-instagram text-white text-[16px]"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid min-[992px]:col-span-5 col-span-12 gap-[10px] min-[992]:px-[12px]">
              <div className="grid grid-cols-12 justify-between">
                <div className="flex col-span-12 flex-col">
                  <h3 className="text-white min-[768px]:text-[24px] text-[20px] col-span-12  mb-[32px] font-extrabold">
                    Global Presence
                  </h3>
                  <div className="grid grid-cols-12 gap-[24px] w-full">
                    <div className="flex gap-[10px] min-[768px]:col-span-6 col-span-12 border-b pb-[20px] border-white">
                      <img
                        className="w-[24px] h-[24px] object-cover mt-[8px] rounded-full"
                        src="https://nexait.io/assets/images/usa-flag-24.svg"
                        alt="USA Flag"
                      />

                      <div className="ml-[12px] ">
                        <p className="text-white min-[768px]:text-[24px] text-[20px] font-extrabold min-[768]:mb-[12px] mb-[16px]">
                          United States
                        </p>
                        <p className="text-[#D4D4DD] min-[992px]:text-[14px] text-[12px] font-medium">
                          112, 166 Geary St. 15th Floor, San Francisco, CA, San
                          Francisco, US, 94108
                        </p>
                      </div>
                    </div>

                    <div className="flex min-[768px]:col-span-6 col-span-12 border-b pb-[20px] border-white">
                      <img
                        src="https://nexait.io/assets/images/india-flag-24.svg"
                        alt="flag1"
                        className="w-[24px] h-[24px] mt-[8px] object-cover rounded-full"
                      />

                      <div className="ml-[12px] ">
                        <p className="text-white min-[768px]:text-[24px] text-[20px] font-extrabold min-[768]:mb-[12px] mb-[16px]">
                          India Office
                        </p>
                        <p className="text-[#D4D4DD] min-[992px]:text-[14px] text-[12px] font-medium">
                          Office no. 2228, 2nd Floor, J.K Infotech, Hinjewadi -
                          Phase 1, Near Ruby Hall Clinic, Pune - 411057
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 flex flex-col gap-[12px]">
                      <div className="flex items-center gap-[12px]">
                        <i className="fa-solid fa-phone text-orange-600 text-[16px]"></i>
                        <p className="text-[#D4D4DD] text-[14px] font-bold">
                          <span className="mr-[8px] text-white font-extrabold">
                            US :
                          </span>
                          +1 415-900-0333
                        </p>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <i className="fa-solid fa-phone text-orange-600 text-[16px]"></i>
                        <p className="text-[#D4D4DD] text-[14px] font-bold">
                          <span className="mr-[8px] text-white font-extrabold ">
                            India:
                          </span>
                          +91 8087555678
                        </p>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <i className="fa-solid fa-envelope text-orange-600 text-[16px]"></i>
                        <p className="text-[#D4D4DD] text-[14px] font-bold">
                          <span className="mr-[8px] text-white font-extrabold">
                            Email:
                          </span>
                          info@nexait.io
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 min-[992px]:block hidden">
            <ul className="flex gap-[24px]">
              <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                <i className="fa-brands fa-facebook-f text-white text-[16px]"></i>
              </li>
              <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                <i className="fa-brands fa-twitter text-white text-[16px]"></i>
              </li>
              <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                <i className="fa-brands fa-linkedin-in text-white text-[16px]"></i>
              </li>
              <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[20px] py-[8px] rounded-full">
                <i className="fa-brands fa-instagram text-white text-[16px]"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex items-center min-[]577px:gap-[40px] gap-[20px] min-[577px]:mt-[48px] mt-[26px] flex-wrap ">
          <div className="logo pr-[40px] min-[577px]:border-r border-white/70 min-[577px]:flex gap-[20px] block">
            <img
              src="https://nexait.io/assets/images/logo-sm.svg"
              className="w-[120px] h-[33px]"
              alt="Nexa IT"
            />
            <div className="col-span-12 min-[768px]:hidden block min-[577px]:ml-[12px] ml-0 min-[577px]:mt-0 mt-[24px]">
              <ul className="flex gap-[24px]">
                <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[14px] py-[8px] rounded-full">
                  <i className="fa-brands fa-facebook-f text-white text-[16px]"></i>
                </li>
                <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[14px] py-[8px] rounded-full">
                  <i className="fa-brands fa-twitter text-white text-[16px]"></i>
                </li>
                <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[14px] py-[8px] rounded-full">
                  <i className="fa-brands fa-linkedin-in text-white text-[16px]"></i>
                </li>
                <li className="flex items-center cursor-pointer bg-[rgba(255,255,255,0.1)] px-[14px] py-[8px] rounded-full">
                  <i className="fa-brands fa-instagram text-white text-[16px]"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-[40px] justify-center">
            <p className="text-[rgba(156,163,175)] text-[14px]">
              <span className="text-[white] font-extrabold text-[14px]">
                © 2026 Nexait.
              </span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

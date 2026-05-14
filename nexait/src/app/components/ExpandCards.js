"use client";

import { useState } from "react";

function ExpandCards() {
  const [active, setActive] = useState(2);

  const cards = [
    {
      title: "Industries Expertise",
      number: "15+",
      image: "https://nexait.io/assets/images/industries-mastered-bg.webp",
      desc: "Over the past decade, our expertise has transcended 15+ diverse industries, allowing us to craft unparalleled digital solutions.",
      p: "Industries Expertise",
    },
    {
      title: "Crafted Solutions",
      number: "50+",
      image: "https://nexait.io/assets/images/tech-evangelists-bg.webp",
      desc: "We build scalable modern digital products for growing businesses.",
      p: "Industries Expertise",
    },
    {
      title: "Tech Enthusiasts",
      number: "100+",
      image: "https://nexait.io/assets/images/solutions-designed-bg.webp",
      desc: "Our team includes developers, engineers, and tech innovators.",
      p: "Industries Expertise",
    },
    {
      title: "Industries Expertise",
      number: "15+",
      image: "https://nexait.io/assets/images/industries-mastered-bg.webp",
      desc: "Over the past decade, our expertise has transcended 15+ diverse industries, allowing us to craft unparalleled digital solutions.",
      p: "Industries Expertise",
    },
    {
      title: "Crafted Solutions",
      number: "50+",
      image: "https://nexait.io/assets/images/tech-evangelists-bg.webp",
      desc: "We build scalable modern digital products for growing businesses.",
      p: "Industries Expertise",
    },
  ];

  return (
    <section className="min-[769px]:py-[100px] py-[80px] bg-white w-full">
      <div className="block md:hidden min-[577px]:px-4 px-3 space-y-6 w-full">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col">
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`relative w-full overflow-hidden rounded-[12px] cursor-pointer transition-all duration-700 ${
                active === index
                  ? "max-[576px]:h-[400px] h-[460px] opacity-100"
                  : "max-[576px]:h-[80px] h-[80px] opacity-60"
              }`}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

              <div className="absolute left-0 top-1/2 z-20 w-full min-[1025px]:w-[600px] min-[577px]:px-8 px-6 -translate-y-1/2 text-white">
                <div className="overflow-hidden w-full">
                  <h1
                    className={`whitespace-nowrap text-6xl font-bold transform transition-all duration-700
                                  ${
                                    active === index
                                      ? "opacity-100"
                                      : " opacity-0"
                                  }`}
                  >
                    {card.number}
                  </h1>
                </div>

                <div className="mt-2 overflow-hidden">
                  <div
                    className={`whitespace-nowrap text-[30px] font-extrabold transform transition-all duration-700
                          ${
                            active === index
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                  >
                    {card.title}
                  </div>
                </div>

                <div className="mt-3 overflow-hidden w-full">
                  <p
                    className={`text-[16px] w-full font-bold leading-relaxed transform transition-all duration-700
                            ${
                              active === index
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-black font-extrabold mt-[10px] text-[18px]">
              {card.p}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="container min-[1551px]:h-[420px] h-[400px]">
          <div className="flex h-full w-full gap-6 justify-center rounded-[12px] bg-white">
            {cards.map((card, index) => (
              <>
                <div key={index} className="flex flex-col">
                  <div
                    key={index}
                    onMouseEnter={() => setActive(index)}
                    className={`relative h-full overflow-hidden rounded-[12px] cursor-pointer transition-all duration-700 ${
                      active === index
                        ? "w-[400px] min-[1025px]:w-[600px] opacity-100"
                        : "w-[80px] min-[1025px]:w-[180px] opacity-60"
                    }`}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

                    <div className="absolute left-0 top-1/2 z-20 w-[380px] min-[1025px]:w-[600px] -translate-y-1/2 px-10 text-white">
                      <div className="overflow-hidden">
                        <h1
                          className={`whitespace-nowrap text-6xl font-bold transform transition-all duration-700
                                  ${
                                    active === index
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                        >
                          {card.number}
                        </h1>
                      </div>

                      <div className="mt-2 overflow-hidden">
                        <div
                          className={`whitespace-nowrap text-[30px] font-extrabold transform transition-all duration-700
                          ${
                            active === index
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          {card.title}
                        </div>
                      </div>

                      <div className="mt-3 overflow-hidden">
                        <p
                          className={`max-w-md text-[16px] font-bold leading-relaxed transform transition-all duration-700
                            ${
                              active === index
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-black font-extrabold mt-[10px] text-[18px]">
                    {card.p}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpandCards;

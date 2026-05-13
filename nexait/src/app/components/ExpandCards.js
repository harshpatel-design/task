"use client";

import { useState } from "react";

const cards = [
  {
    title: "Industries Expertise",
    number: "15+",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    desc: "Over the past decade, our expertise has transcended industries.",
  },
  {
    title: "Tech Enthusiasts",
    number: "100+",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    desc: "Dynamic team of developers and engineers.",
  },
  {
    title: "Modernized Legacy",
    number: "80%",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    desc: "Helping companies modernize systems.",
  },
  {
    title: "Crafted Solutions",
    number: "50+",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    desc: "We build scalable modern digital products.",
  },
  {
    title: "Modernized Legacy",
    number: "80%",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    desc: "Helping companies modernize systems.",
  },
];

function ExpandCards() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-[50px]">
      <div className="container">
        <div className="flex h-[500px] w-full gap-4 overflow-hidden justify-center bg-white p-10">
          {cards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              className={`group relative h-[420px] overflow-hidden rounded-[20px] bg-cover bg-center transition-all duration-500 cursor-pointer ${
                active === index
                  ? "opacity-100 w-[600px]"
                  : "opacity-60 w-[160px]"
              }`}
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="z-10 text-white py-4 px-10 absolute left-0 top-[50%] transform -translate-y-1/2 overflow-hidden">
                <h1 className="text-[70px] font-extrabold mb-[-10px] tracking-tight translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                  {card.number}
                </h1>

                <h2 className="text-[30px] font-extrabold whitespace-nowrap translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                  {card.title}
                </h2>

                <p className="max-w-md text-[16px] font-bold mt-3 translate-x-20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExpandCards;

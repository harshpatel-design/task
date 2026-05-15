import React from "react";

function Portfolio() {
  return (
    <section className="min-[769px]:py-[100px] min-[577px]:pt-[80px] pt-[40px] bg-[#000000]">
      <div className="container">
        <div className="grid min-[769px]:grid-cols-2 min-[769px]:gap-[40px] gap-[10px]">
          <div>
            <h1 className="min-[1551px]:text-[3.5rem] min-[1025px]:text-[3.2rem] min-[769px]:text-[2.7rem] min-[577px]:text-[2.5rem] text-[2rem] text-white font-bold min-[1281px]:pr-[40px]">
              Building Bridges with Digital Solutions and Scaling Business
              Across Platforms
            </h1>
          </div>
          <div>
            <p className="min-[1551px]:text-[1.7rem]  min-[1025px]:text-[1.5rem] min-[769px]:text-[1.4rem] text-[1.2rem] max-[1025px]:leading-[35px] text-white font-semibold">
              We empower businesses to dominate markets and industries at the
              global level via modern digital solutions. Our Engineers and
              developers are experienced creators of high-performing software
              products that transform businesses into industry leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;

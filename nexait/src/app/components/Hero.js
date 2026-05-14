import React from "react";
import "../globals.css";

const Milson = ({ src }) => {
  return (
    <div className="flex justify-center">
      <picture className="flex items-center justify-center">
        <source media="(min-width:1200px)" srcSet={src} />
        <source media="(min-width:320px)" srcSet={src} />
        <img
          className="mr-3"
          loading="lazy"
          src={src}
          alt="iso certificate"
          width={"100%"}
          height={"auto"}
        />
      </picture>
    </div>
  );
};

function Hero() {
  return (
    <>
      <section className="relative min-[1025px]:flex min-[1025px]:h-screen w-full items-center justify-center min-[1025px]:overflow-hidden bg-[#0e0e0e]">
        <div className="container block relative min-[1025px]:hidden ">
          <div className="hero-content flex flex-col justify-center mt-[76px] min-[577px]:pt-[50px] pt-[20px] pb-[30px] ">
            <h1 className="relative min-[769]:text-[4.2rem] min-[577px]:text-[2rem] text-[1.8rem] min-[769px]:w-[80%] w-full  font-semibold leading-snug text-white">
              Explore the Architects of Modern Digital Solutions
            </h1>
            <p className="relative min-[769]:text-[2rem] min-[577px]:text-[1.6rem] text-[1.2rem]  min-[577px]:mt-10 mt-[24px] font-semibold leading-snug text-white">
              We are positioning businesses for growth, development, and success
              using modern tools and robust technologies.
            </p>
          </div>
        </div>
        
        <div className="effect-hero z-1"></div>

        <div className="container relative hidden min-[1025px]:flex z-40">
          <div className="hero-content flex flex-col justify-center ">
            <h1 className="relative text-[4rem] min-[1551px]:text-[5rem] w-[70%] min-[1551px]:w-[70%] font-semibold leading-snug text-white">
              Explore the Architects of Modern Digital Solutions
            </h1>
            <p className="relative text-[2rem] w-[55%] mt-10 font-semibold leading-snug text-white">
              We are positioning businesses for growth, development, and success
              using modern tools and robust technologies.
            </p>
          </div>
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          className="min-[1025px]:absolute inset-0 z-30  h-full w-full object-cover"
        >
          <source
            src="https://nexait.io/assets/video/Nexait_hero.mp4"
            type="video/mp4"
          />
        </video>
      </section>

      <section className="relative w-full bg-black py-[50px] px-[4px] min-[769px]:px-0">
        <div className="mx-auto flex min-[1551px]:max-w-[1420px] max-w-[1280px] w-full">
          <div className="grid w-full min-[769px]:grid-cols-6 grid-cols-3 min-[769px]:gap-[30px] gap-[10px]">
            <Milson src="https://nexait.io/assets/images/bagge/iso-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/NASSCOM_lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/clutch-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/trustpilot-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/goodfirms-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/gdpr-lg.svg" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

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
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0e0e0e]">
        <div className="effect-hero z-1"></div>
        <div className="container relative z-2">
          <div className="hero-content flex flex-col justify-center">
            <h1 className="relative text-[5rem] w-[50%] font-semibold leading-snug text-white">
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
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://nexait.io/assets/video/Nexait_hero.mp4"
            type="video/mp4"
          />
        </video>
      </section>

      <section className="relative w-full bg-black py-[50px]">
        <div className="mx-auto flex max-w-[1420px] w-full">
          <div className="grid w-full grid-cols-6 gap-20">
            <Milson src="https://nexait.io/assets/images/bagge/iso-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/NASSCOM_lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/clutch-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/goodfirms-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/trustpilot-lg.svg" />
            <Milson src="https://nexait.io/assets/images/bagge/gdpr-lg.svg" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

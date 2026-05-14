"use client";
import React from "react";
import Wapper from "./Wapper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function SwiperWrapper() {
  return (
    <section className="relative w-full overflow-hidden bg-[#000000] py-[100px] text-white">
      <div className="container-fluid ">
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          spaceBetween={10}
          loop={true}
          speed={800}
          allowTouchMove={true}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          updateOnWindowResize={true}
          breakpoints={{
            1025: {
              slidesPerView: 1.7,
              centeredSlides: true,
              spaceBetween: 0,
            },

            1550: {
              slidesPerView: 1.7,
              centeredSlides: true,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <Wapper
              url="https://nexait.io/assets/images/casestudy/schwarzkopf-casestudy.webp"
              wapperHeding="Schwarzkopf"
              wapperTech="Java, AWS, Amazon CloudFront"
              wapperDesc="Developed backend for Schwarzkopf Professional's website, with a specific focus on the diversified product categories and user base."
              wapperResultUser="60%"
              wapperResultBackend="80%"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Wapper
              url="https://nexait.io/assets/images/casestudy/foldhealth-casestudy.webp"
              wapperHeding="Fold.health"
              wapperTech="React.JS, Node.JS, React Native MongoDB, AWS"
              wapperDesc="Developed a platform that streamlines care coordination and automates administrative tasks."
              wapperResultUser="70%"
              wapperResultBackend="500K"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Wapper
              url="https://nexait.io/assets/images/casestudy/agroiot-casestudy.webp"
              wapperHeding="AgroIOT"
              wapperTech="React.JS, Node.JS, React Native MongoDB, AWS"
              wapperDesc="Developed a platform that streamlines care coordination and automates administrative tasks."
              wapperResultUser="60%"
              wapperResultBackend="30%"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Wapper
              url="https://nexait.io/assets/images/casestudy/timexfit-casestudy.webp"
              wapperHeding="TimexFit"
              wapperTech="Native Android, IOS swift, .net, Firebase, Mixpanel"
              wapperDesc="Wearable OS customization of functionalities like activity tracking, notifications, and fitness monitoring for both Android and iOS devices."
              wapperResultUser="60%"
              wapperResultBackend="30%"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Wapper
              url="https://nexait.io/assets/images/casestudy/foldhealth-casestudy.webp"
              wapperHeding="Fold.health"
              wapperTech="React.JS, Node.JS, React Native MongoDB, AWS"
              wapperDesc="Developed a platform that streamlines care coordination and automates administrative tasks."
              wapperResultUser="70%"
              wapperResultBackend="500K"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default SwiperWrapper;

import React from "react";

function Wapper({
  url,
  wapperHeding,
  wapperTech,
  wapperDesc,
  wapperResultUser,
  wapperResultBackend,
}) {
  return (
    <>
      <div className="min-[1025]:mr-[40px] mx-[10px]">
        <div className="reletive w-full overflow-hidden block">
          <div>
            <picture>
              <source media="(min-width:1600px)" srcSet={url} />
              <source media="(min-width:768px)" srcSet={url} />
              <source media="(min-width:320px)" srcSet={url} />

              <img
                loading="lazy"
                src={url}
                alt=""
                className="w-full h-[190px] min-[769px]:h-auto object-cover rounded-[12px]"
                width={1095}
                height={600}
              />
            </picture>
          </div>

          <div className="min-[769px]:mt-[40px] mt-[20px] w-full grid gap-[16px] min-[1025px]:px-0 px-[8px] grid-cols-12 bg-black">
            <div className="min-[769px]:col-span-4 col-span-12 min-[769px]:px-2">
              <div className="">
                <div>
                  <h2 className="text-white min-[1551px]:text-[42px] min-[1380]:text-[40px]  min-[1120]:text-[36px] text-[30px] font-extrabold">
                    {wapperHeding}
                  </h2>
                </div>
                <div className="bg-[#23232c] min-[769px]:mt-[25px] mt-[14px] rounded-[12px] min-[1025px]:p-[12px] min-[769px]:p-[16px] p-[12px] min-[1025px]:w-fit">
                  <span className="text-[#9c9c9c] mb-[12px] min-[1281]:text-[16px] text-[14px] block font-bold">
                    Built with
                  </span>
                  <p className="text-white font-bold min-[1281]:text-[16px] min-[769px]:text-[14px] text-[15px]">
                    {wapperTech}
                  </p>
                </div>
              </div>
            </div>

            <div className="min-[769px]:col-span-4 col-span-12 min-[769px]:px-2">
              <div className="">
                <p className="text-white min-[1551px]:text-[18px] min-[769px]:text-[16px] text-[17px] font-bold leading-[30px]">
                  {wapperDesc}
                </p>
                <button className="mt-[30px] w-fit orange-btn  border-3 border-white min-[1281]:px-4 min-[1281]:py-3 min-[1281]:text-[16px] text-[14px] px-3 py-2 font-bold text-black">
                  View Case Study
                </button>
              </div>
            </div>

            <div className="hidden min-[769px]:block min-[769px]:col-span-4 px-2">
              <p className="text-[#9c9c9c] min-[1551px]:text-[16px] text-[16px] mb-[20px]">
                Results
              </p>
              <div className="font-bold text-white text-[17px] w-full leading-[30px] mb-[20px]">
                <span className="min-[1551px]:text-[2rem] text-[1.8rem] font-extrabold text-white">
                  {wapperResultUser}
                </span>
                <p className="font-bold min-[1551px]:text-[16px] text-[1rem] leading-[24px] text-shadow-white text-white">
                  Higher User engagement
                </p>
              </div>
              <div className="font-bold text-white text-[17px] w-full leading-[30px] mb-[20px]">
                <span className="min-[1551px]:text-[2rem] text-[1.8rem] font-extrabold text-white">
                  {wapperResultBackend}
                </span>
                <p className="font-bold  min-[1551px]:text-[16px] text-[1rem] leading-[30px] text-shadow-white text-white">
                  High Efficient Backend
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wapper;

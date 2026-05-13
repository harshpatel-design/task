import React from "react";

function Wapper({url,wapperHeding,wapperTech,wapperDesc,wapperResultUser,wapperResultBackend}) {
  return (
    <>
      <div className="mr-[40px]">
        <div className="reletive w-full overflow-hidden block">
          <div>
            <picture>
              <source
                media="(min-width:1600px)"
                srcSet={url}
              />
              <source
                media="(min-width:768px)"
                srcSet={url}
                width="779"
                height="410"
              />
              <source
                media="(min-width:320px)"
                srcSet={url}
                width="345"
                height="182"
              />
              <img
                loading="lazy"
                src={url}
                alt=""
                className="casestudy-img"
                width="1095"
                height="100%"
              />
            </picture>
          </div>

          <div className="mt-[40px] grid grid-cols-12 bg-black">
            <div className="col-span-4 px-2">
              <div className="">
                <div>
                  <h2 className="text-white text-[52px] font-[1000]">
                    {wapperHeding}
                  </h2>
                </div>
                <div className="bg-[#23232c] mt-[25px] rounded-[12px] p-[12px] w-fit">
                  <span className="text-[#9c9c9c] mb-[12px] text-[16px] block font-bold">
                    Built with
                  </span>
                  <p className="text-white font-bold text-[16px]">
                    {wapperTech}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-4 px-2">
              <div className="">
                <p className="text-white text-[17px] font-bold leading-[30px]">
                 {wapperDesc}
                </p>
                <button className="mt-[30px] w-fit orange-btn  border-3 border-white px-4 py-3 font-bold text-black">
                  View Case Study
                </button>
              </div>
            </div>

            <div className="col-span-4 px-2">
              <p className="text-[#9c9c9c] text-[16px] mb-[20px]">Results</p>
              <div className="font-bold text-white text-[17px] w-full leading-[30px] mb-[20px]">
                <span className="text-[2rem] font-extrabold text-white">
                  {wapperResultUser}
                </span>
                <p className="font-bold text-16px leading-[24px] text-shadow-white text-white">
                  Higher User engagement
                </p>
              </div>
              <div className="font-bold text-white text-[17px] w-full leading-[30px] mb-[20px]">
                <span className="text-[2rem] font-extrabold text-white">
                  {wapperResultBackend}
                </span>
                <p className="font-bold text-16px leading-[30px] text-shadow-white text-white">
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

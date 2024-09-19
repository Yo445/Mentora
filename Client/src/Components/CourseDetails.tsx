import React from "react";
import { GoPaperAirplane } from "react-icons/go";
import { TiStarFullOutline } from "react-icons/ti";

export default function CourseDetails(): JSX.Element {
  return (
    <>
      <div className="container mx-auto px-6 py-3">
        <div className="mx-auto max-w-7xl pt-16 sm:pt-24">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-4 bg-black p-4 rounded-[10px]">
                  <div className="space-y-2">
                    <span className="px-4 inline-flex text-[15px] leading-6 font-semibold rounded-full bg-green-100 text-green-800">
                      Easy
                    </span>
                    <h1 className="text-2xl font-bold tracking-tight text-[#2a2f3f] sm:text-3xl md:text-4xl">
                      <span className="font-extrabold text-[#ddff7d]">
                        professional UI/UX
                      </span>
                      <br />
                    </h1>
                  </div>
                  <h3 className="text-xl mt-5 text-white">
                    by_<span>instructor</span>{" "}
                  </h3>
                  <p className="text-base text-[gray] sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Immerse yourself in superior audio quality with the
                    StellarGlo Wireless Bluetooth Earbuds. These sleek and
                    lightweight earbuds deliver crystal-clear sound and rich
                    bass.
                  </p>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-white">Ratings</h2>
                    <h3 className="text-[#cda400] flex items-center">
                      3.5 <TiStarFullOutline />
                    </h3>
                  </div>
                </div>

                <div className="border-t border-gray-700"></div>

                <div className="flex space-x-4 items-center text-white">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                      <button className="flex overflow-hidden ring-[5px] ring-black w-[5.1rem] hover:w-[6.5rem] items-center gap-2 cursor-pointer bg-black text-white px-5 py-2 rounded-full transition-all ease-in-out hover:scale hover:scale-105 font-[revert] active:scale-100 shadow-lg hover:text-[#ddff7d]">
                        Enroll
                        <GoPaperAirplane fontSize={"22px"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full col-span-6">
              <div className="px-6 h-96 lg:h-100% w-full max-w-2xl col-span-6 flex items-center mx-auto rounded-[10px]">
                <div className="w-[100%] h-[104%] rounded-[10px]">
                  <div className="w-[100%] h-[100%] bg-white rounded-[10px] overflow-hidden">
                    <iframe
                      className="rounded-[10px]" // Apply border-radius to the iframe
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/mr15Xzb1Ook?autoplay=0&mute=0&controls=0"
                      id="widget2"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

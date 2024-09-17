import React from "react";
import Left from "../assets/img/side1.svg";
import Right from "../assets/img/side2.svg";
import Down from "../assets/img/patternpad.svg";
import Text from "../assets/img/textBg.svg";
import { FaChevronRight } from "react-icons/fa";
import { FaRegHandPointRight } from "react-icons/fa6";

import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <section className="relatve">
      {/* <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover z-[1]" /> */}
      {/* <!-- Container --> */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* <!-- Heading Div --> */}
        <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
          <h1 className="mb-4 text-4xl font-semibold md:text-6xl text-[#2a2f3f]">
            Empowering Knowledge, One Course at a Time
            <span
              className="px-4 text-[#000]"
              style={{
                backgroundImage: `url(${Text})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Mentoria
            </span>
            .
          </h1>

          <p className="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">
            Mentoria is an online course platform designed to connect
            instructors and students in a seamless learning environment.
          </p>
          {/* <!-- Button Wrap --> */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center ">
              <div className="relative group">
                <Link to="/login">
                  <button className="relative inline-block p-px font-semibold leading-6 text-[white] bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 hover:text-[#ddff7d]">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-400 via-[#ddff7d] to-[#ddff7d] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          Let&apos;s get started
                        </span>
                      <FaChevronRight className="transition-transform duration-500 group-hover:translate-x-1"/>
                      </div>
                    </span>
                  </button>
                </Link>

                {/* <Link to={'/login'} className="mr-5 font-semibold text-[1.3em] w-[12em] h-[3em] bg-[#2a2f3f] text-[#ddff7d] border border-[#ddff7d] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-[#ddff7d] shadow-[#ddff7d] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
              <h1 className="text-[1.19em]">Get Started</h1>
            </Link> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Image Div --> */}
        <div className="relative h-[500px]">
          <img
            src={Down}
            alt=""
            className="inline-block h-full w-full rounded-xl object-cover sm:rounded-2xl"
          />
        </div>
      </div>
      {/* <!-- BG Images --> */}
      <img
        src={Left}
        alt=""
        className="absolute bottom-0 left-0 right-auto top-auto -z-10 inline-block md:bottom-1/2 md:left-0 md:right-auto md:top-auto"
      />
      <img
        src={Right}
        alt=""
        className="absolute bottom-auto left-auto right-0 top-0 -z-10 hidden sm:inline-block"
      />
    </section>
  );
}

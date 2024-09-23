import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoZap } from "react-icons/go";

interface CardProps {
  id: string | number;
  title: string;
  date: string;
  avatars: string[];
}

export default function Card({
  id,
  title,
  date,
  avatars,
}: CardProps): JSX.Element {
  return (
    <div className="rounded-[25px] bg-black p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <Link to="#">
        <div className="flex flex-col gap-y-2 rounded-[22px] bg-[#aeca9e] w-[15em] h-[200px] p-4">
          <h4 className="text-2xl font-bold text-black  lg:text-left">
            Professional UI/UX Design Service
          </h4>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-[#d4d4d4] flex"><FaChalkboardTeacher className="mt-1 mr-1"/>Ahmed Ali</h2>
          <div className="mt-3 flex items-end justify-between">
            <div
              className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full"
            >
              <GoZap className="mt-1 mr-2" />
              Easy
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

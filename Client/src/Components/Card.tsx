import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { getToken } from "../helper/Storage";
import { GoLog } from "react-icons/go";
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
      <a href="#">
        <div className="flex flex-col gap-y-2 rounded-[22px] bg-[#aeca9e] w-[15em] h-[200px] p-4">
          <h4 className="text-2xl font-bold text-black  lg:text-left">
            Professional UI/UX Design Service
          </h4>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">The Hilton Hotel</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg font-bold text-[#ddff7d]">$450</p>
            <Link
              to="/course"
              className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full"
            >
              <GoZap className="mt-1 mr-2" />
              Get Started
            </Link>
          </div>
        </div>
      </a>
    </div>
  );
}

import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoZap } from "react-icons/go";
import { Link } from "react-router-dom";

interface CardProps {
  id: string | number;
  title: string;
  description: string;
  instructor: string;
  students: string[];
  category: string;
  difficulty: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  instructor,
  students,
  category,
  difficulty,
}) => {
  // Determine the color class based on the difficulty level
  let difficultyClass;
  switch (difficulty) {
    case "beginner":
      difficultyClass = "text-[#ddff7d]"; // Green for beginner
      break;
    case "intermediate":
      difficultyClass = "text-orange-500"; // Orange for intermediate
      break;
    case "advanced":
      difficultyClass = "text-red-500"; // Red for advanced
      break;
    default:
      difficultyClass = "text-gray-400"; // Default color for unknown difficulty
  }

  return (
    <div className="rounded-[25px] bg-black p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <Link to={`course/${id}`}>
        <div className="flex flex-col gap-y-2 rounded-[22px] bg-[#aeca9e] p-4">
          <h4 className="text-2xl font-bold text-black lg:text-left">
            {title}
          </h4>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-[#d4d4d4] flex">
            <FaChalkboardTeacher className="mt-1 mr-1" />
            {instructor}
          </h2>
          <div className="mt-3 flex items-end justify-between">
            <div className={`flex item-start bg-[#2a2f3f] ${difficultyClass} w-fit px-5 py-1 rounded-full`}>
              <GoZap className="mt-1 mr-2" />
              {difficulty}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

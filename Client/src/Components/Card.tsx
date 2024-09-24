import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoZap } from "react-icons/go";

interface CardProps {
  id: string | number; 
  title: string;
  description: string;
  instructor: string;
  students: string[];
  category: string;
  difficulty: string;
  onClick: () => void; // Add onClick prop

}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  instructor,
  students,
  category,
  difficulty,
  onClick,
}) => {
  return (
    <div className="rounded-[25px] bg-black p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div 
        onClick={onClick}
        // aria-label={`View course ${title}`} 
        // state={{ course: { id, title, description, instructor, students, category, difficulty } }} // Passing the course data in state
      >
        <div className="flex flex-col gap-y-2 rounded-[22px] bg-[#aeca9e] p-4">
          <h4 className="text-2xl font-bold text-black lg:text-left">
            {title} {/* Display the course title */}
          </h4>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-[#d4d4d4] flex">
            <FaChalkboardTeacher className="mt-1 mr-1" />
            {instructor} {/* Display the instructor's name */}
          </h2>
          <div className="mt-3 flex items-end justify-between">
            <div className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full">
              <GoZap className="mt-1 mr-2" />
              {difficulty} {/* Display the difficulty level */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center min-h-screen">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 border-transparent text-[#ddff7d]text-4xl animate-spin flex items-center justify-center border-t-[#ddff7d] rounded-full">
          <div className="w-20 h-20 border-8 border-transparent text-[black] text-2xl animate-spin flex items-center justify-center border-t-[black] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loader;

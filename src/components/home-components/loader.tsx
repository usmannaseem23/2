import React from "react";
import { Cloud } from "lucide-react";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative">
        {/* Outer spinning border */}
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 border-opacity-70"></div>

        {/* Inner slower spinning border */}
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-transparent animate-[spin_1.5s_linear_infinite] border-blue-300 border-opacity-50"></div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
          <Cloud size={40} className="opacity-90 animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-4 text-gray-700 text-lg font-medium">
        Please wait, Loading Products.....
      </div>
    </div>
  );
}

export default Loader;

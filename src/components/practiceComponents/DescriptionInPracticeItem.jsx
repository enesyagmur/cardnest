import React from "react";
import { HiOutlineAnnotation } from "react-icons/hi";

const DescriptionInPracticeItem = ({ item }) => {
  return (
    <div className="w-full bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Icon and Quote Mark */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center border border-pink-200">
          <HiOutlineAnnotation className="w-4 h-4 text-pink-600" />
        </div>
        <div className="flex-1">
          <div className="text-2xl text-pink-400 font-serif leading-none">
            "
          </div>
        </div>
      </div>

      {/* Description Content */}
      <div className="pl-10">
        <p className="text-sm text-gray-700 leading-relaxed italic font-medium">
          {item.description}
        </p>
      </div>

      {/* Bottom Quote Mark */}
      <div className="flex justify-end mt-2">
        <div className="text-2xl text-pink-400 font-serif leading-none">"</div>
      </div>
    </div>
  );
};

export default DescriptionInPracticeItem;

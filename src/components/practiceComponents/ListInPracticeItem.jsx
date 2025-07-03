import React from "react";
import { HiOutlineViewList, HiOutlineChevronRight } from "react-icons/hi";

const ListInPracticeItem = ({ item }) => {
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
          <HiOutlineViewList className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="text-base font-bold text-gray-800 leading-tight">
          {item.listTitle}
        </h3>
      </div>

      {/* List Items */}
      <div className="space-y-2">
        {item.listArray.map((dot) => (
          <div
            key={dot.id}
            className="flex items-start gap-3 p-2 bg-white/70 rounded-lg border border-purple-100 hover:bg-white/90 transition-colors duration-150"
          >
            <div className="flex-shrink-0 w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
              <HiOutlineChevronRight className="w-3 h-3 text-purple-600" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed flex-1">
              {dot.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInPracticeItem;

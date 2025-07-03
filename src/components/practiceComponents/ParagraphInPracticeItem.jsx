import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

const ParagraphInPracticeItem = ({ item }) => {
  return (
    <div className="w-full space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header with Icon */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
          <HiOutlineDocumentText className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-800 leading-tight">
            {item.paragraphTitle}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="pl-11">
        <p className="text-sm text-gray-700 leading-relaxed">
          {item.paragraphContent}
        </p>
      </div>
    </div>
  );
};

export default ParagraphInPracticeItem;

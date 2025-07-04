import React from "react";

const ParagraphInPracticeItem = ({ item }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      key={item.id}
    >
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            {item.paragraphTitle}
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.paragraphContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParagraphInPracticeItem;

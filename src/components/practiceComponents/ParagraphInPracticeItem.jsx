import React from "react";

const ParagraphInPracticeItem = ({ item }) => {
  return (
    <div className="w-11/12 space-y-2 bg-white p-4 rounded-md border border-gray-200">
      <h3 className="text-base font-bold text-gray-800">
        {item.paragraphTitle}
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed">
        {item.paragraphContent}
      </p>
    </div>
  );
};

export default ParagraphInPracticeItem;

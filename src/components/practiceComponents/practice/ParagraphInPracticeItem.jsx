import React from "react";

const ParagraphInPracticeItem = ({ item }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.paragraphTitle}
      </h3>
      <p className="text-gray-700 leading-relaxed">{item.paragraphContent}</p>
    </div>
  );
};

export default ParagraphInPracticeItem;

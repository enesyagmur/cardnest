import React from "react";

const DescriptionInPracticeItem = ({ item }) => {
  return (
    <p className="w-full text-sm text-center text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded-md border border-gray-200">
      {item.description}
    </p>
  );
};

export default DescriptionInPracticeItem;

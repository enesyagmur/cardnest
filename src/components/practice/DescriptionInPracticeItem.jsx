import React from "react";

const DescriptionInPracticeItem = ({ item }) => {
  return (
    <p className="text-gray-700 text-base leading-relaxed italic">
      {item.description}
    </p>
  );
};

export default DescriptionInPracticeItem;

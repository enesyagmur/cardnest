import React from "react";

const ListInPracticeItem = ({ item }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">
        {item.listTitle}
      </h3>
      <ul className="list-disc list-inside text-gray-700">
        {item.listArray.map((dot, index) => (
          <li key={index} className="mb-1">
            {dot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInPracticeItem;

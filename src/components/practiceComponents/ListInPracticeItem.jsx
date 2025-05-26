import React from "react";

const ListInPracticeItem = ({ item }) => {
  return (
    <div className="w-full  bg-gray-50 p-2 rounded-md border border-gray-200">
      <h3 className="text-base font-semibold text-blue-700">
        {item.listTitle}
      </h3>
      <ul className="list-disc list-inside text-sm text-gray-700 pl-2">
        {item.listArray.map((dot) => (
          <li key={dot.id} className="ml-1">
            {dot.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInPracticeItem;

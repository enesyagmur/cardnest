import React from "react";

const ListInPracticeItem = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            {item.listTitle}
          </h4>
          <ul className="space-y-2">
            {item.listArray.map((dot) => (
              <li
                key={dot.id}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-relaxed">{dot.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListInPracticeItem;

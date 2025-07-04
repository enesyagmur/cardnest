import React from "react";

const DescriptionInPracticeItem = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bg-white  p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <p className="text-sm text-gray-700 italic leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default DescriptionInPracticeItem;

import React from "react";

const EmptyList = ({ title, content, height }) => {
  return (
    <div
      className={`w-full ${height} flex flex-col items-center justify-center text-center p-6 bg-gray-50 border border-dashed border-blue-300 rounded-lg shadow-inner`}
    >
      <div className="text-blue-500 mb-4 text-4xl">📂</div>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

export default EmptyList;

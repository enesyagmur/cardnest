import React from "react";

const Card = ({ card }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md max-w-sm mx-auto p-5 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{card.front}</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-5">{card.back}</p>

      <div className="flex gap-3">
        <button className="flex-grow py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
          Kolay
        </button>
        <button className="flex-grow py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition">
          Orta
        </button>
        <button className="flex-grow py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Zor
        </button>
      </div>
    </div>
  );
};

export default Card;

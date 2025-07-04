import React from "react";
import { FaImage } from "react-icons/fa";

const ImageInPracticeItem = ({ item }) => {
  return (
    <div
      key={item.id}
      className="w-full h-[420px] flex items-center justify-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-full flex items-start gap-3">
        <div className="flex items-center justify-center w-6 h-6 bg-pink-200 rounded-full mt-2 ">
          <FaImage className="text-pink-600 text-[10px]" />
        </div>
        <img
          src={item.url}
          alt="card image"
          className="w-[400px] h-[400px] object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageInPracticeItem;

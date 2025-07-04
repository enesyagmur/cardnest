import React from "react";

const ImageInPracticeItem = ({ item }) => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <img
        className="w-[400px] h-[400px] object-cover rounded-md"
        src={item.url}
        alt="card image"
      />
    </div>
  );
};

export default ImageInPracticeItem;

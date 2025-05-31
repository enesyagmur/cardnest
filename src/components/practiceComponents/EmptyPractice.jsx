import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyPractice = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[590px] flex flex-col items-center justify-center text-center p-8  bg-white border border-dashed border-pink-300 rounded-xl shadow-sm  ">
      <div className="text-purple-500 text-4xl mb-4">📂</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Henüz Bir Koleksiyon Oluşturulmadı
      </h2>
      <p className="text-gray-600 mb-6">
        Pratik yapmak için koleksiyon ve kart oluşturmalısınız. Hemen yeni bir
        koleksiyon oluşturmak kolek
      </p>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-pink-100  text-pink-800 border-2 border-pink-800 hover:bg-pink-800 rounded-lg hover:text-white transition"
          onClick={() => navigate("/collections")}
        >
          Koleksiyon Oluştur
        </button>
      </div>
    </div>
  );
};

export default EmptyPractice;

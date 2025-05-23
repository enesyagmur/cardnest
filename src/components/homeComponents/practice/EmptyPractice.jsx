import React from "react";

const EmptyPractice = ({ setPage }) => {
  return (
    <div className="w-full min-h-[510px] flex flex-col items-center justify-center text-center p-8  bg-white border border-dashed border-pink-300 rounded-xl shadow-sm  ">
      <div className="text-purple-500 text-4xl mb-4">📂</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Henüz bir koleksiyon seçilmedi
      </h2>
      <p className="text-gray-600 mb-6">
        Koleksiyonlarınızı görmek ya da yeni bir koleksiyon oluşturmak için
        aşağıdaki seçeneklerden birini kullanabilirsiniz.
      </p>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-pink-100  text-pink-800 border-2 border-pink-800 hover:bg-pink-800 rounded-lg hover:text-white transition"
          onClick={() => setPage("collectionList")}
        >
          Koleksiyonlara Git
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition"
          onClick={() => setPage("collectionForm")}
        >
          Koleksiyon Oluştur
        </button>
      </div>
    </div>
  );
};

export default EmptyPractice;

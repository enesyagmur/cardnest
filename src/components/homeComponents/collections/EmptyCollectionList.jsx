import React from "react";

const EmptyCollectionList = ({ setPage }) => {
  return (
    <div className="w-full  min-h-[590px] bg-gradient-to-tr  from-white to-green-50 p-10 rounded-3xl shadow-xl ">
      <div className="w-full h-[510px] flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-gray-50 border border-dashed border-blue-300 rounded-xl shadow-sm">
        <div className="text-purple-500 mb-4 text-4xl">📂</div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          Henüz bir koleksiyonunuz yok
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          Koleksiyonlarınızı düzenlemek ve kart oluşturmak için önce bir
          koleksiyon eklemelisiniz.
        </p>
        <button
          className="px-4 py-2 bg-green-100  text-green-800 border-2 border-green-800 hover:bg-green-800 rounded-lg hover:text-white transition"
          onClick={() => setPage("collectionForm")}
        >
          Koleksiyon Oluştur
        </button>
      </div>
    </div>
  );
};

export default EmptyCollectionList;

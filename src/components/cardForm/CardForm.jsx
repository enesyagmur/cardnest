import React from "react";

const CardForm = () => {
  return (
    <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Yeni Kart Oluştur
      </h2>

      <label className="block mb-5">
        <span className="text-gray-700 font-semibold mb-1 block">Başlık:</span>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Kart başlığını ya da sorusu giriniz"
          required
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-semibold mb-1 block">İçerik:</span>
        <textarea
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          placeholder="Kart içeriğini yazın"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
      >
        Oluştur
      </button>
    </form>
  );
};

export default CardForm;

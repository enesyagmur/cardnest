import React from "react";

const CollectionItem = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-blue-700">
            Matematik Kartları
          </h3>
          <p className="text-gray-600">Temel matematik konuları için kartlar</p>
        </div>
        <div className="space-x-3">
          <button className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-white transition-colors">
            Düzenle
          </button>
          <button className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white transition-colors">
            Sil
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Örnek Kartlar */}
        <div className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h4 className="font-semibold mb-2">Kareköklü Sayılar</h4>
          <p className="text-gray-700 text-sm mb-3">
            Kareköklü sayıların tanımı ve özellikleri.
          </p>
          <div className="flex gap-2 text-xs">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md">
              Kolay
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-1 rounded-md">
              Orta
            </button>
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-md">
              Zor
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h4 className="font-semibold mb-2">Denklemler</h4>
          <p className="text-gray-700 text-sm mb-3">
            Birinci derece denklemler ve çözümleri.
          </p>
          <div className="flex gap-2 text-xs">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md">
              Kolay
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-1 rounded-md">
              Orta
            </button>
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-md">
              Zor
            </button>
          </div>
        </div>

        {/* İstersen daha fazla kart ekleyebilirsin */}
      </section>
    </div>
  );
};

export default CollectionItem;

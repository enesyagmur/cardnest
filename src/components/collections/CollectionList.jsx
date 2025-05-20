import { useState } from "react";
import CollectionItem from "./CollectionItem";

export default function CollectionList({ setPage, setCollectionForPractice }) {
  const [collections, setCollections] = useState(() => {
    const data = localStorage.getItem("collectionList");
    return data ? JSON.parse(data) : [];
  });
  const [selectCollection, setSelectCollection] = useState({
    state: false,
    collection: {},
  });

  const handleSelectCollection = (item) => {
    setSelectCollection({ state: true, collection: item });
  };

  const handleMoveToPractice = (collect) => {
    setCollectionForPractice(collect);
    setPage("practice");
  };

  const handleDeleteCollection = (id) => {
    if (collections.length !== 0) {
      const newCollections = collections.filter((item) => item.id !== id);
      localStorage.setItem("collectionList", JSON.stringify(newCollections));
      setCollections(newCollections);
    }
  };

  if (Array.isArray(collections) && collections.length > 0) {
    return (
      <div className="w-full mih-h-[590px] flex items-center justify-center  bg-white p-4  rounded-xl shadow-lg opacity-95">
        {selectCollection.state ? (
          <CollectionItem
            selectedCollection={selectCollection.collection}
            setSelectCollection={setSelectCollection}
          />
        ) : (
          <div className="w-full min-h-[565px] flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                className="w-full md:w-96 h-44 bg-gradient-to-br  from-white to-blue-50 border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-blue-700 capitalize">
                        {col.title}
                      </h3>
                      <span className="text-xs font-medium text-blue-400">
                        Koleksiyon
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-blue-600 font-semibold whitespace-nowrap">
                      🗂️ {col.cards?.length ?? 0} kart
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 text-sm">
                  {col.cards?.length > 0 && (
                    <button
                      className="px-3 py-1.5 sm:px-4 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-md transition-colors"
                      onClick={() => handleMoveToPractice(col)}
                    >
                      Pratik Yap
                    </button>
                  )}

                  <button
                    className="px-3 py-1.5 sm:px-4 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md transition-colors"
                    onClick={() => handleSelectCollection(col)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="px-3 py-1.5 sm:px-4 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors"
                    onClick={() => handleDeleteCollection(col.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full  min-h-[590px] bg-gradient-to-br from-white to-blue-50 p-10 rounded-3xl shadow-xl ">
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
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            onClick={() => setPage("collectionForm")}
          >
            Koleksiyon Oluştur
          </button>
        </div>
      </div>
    );
  }
}

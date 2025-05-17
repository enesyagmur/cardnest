import { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";

export default function CollectionList({ setPage, setCollectionForPractice }) {
  const [collections, setCollections] = useState([]);
  const [selectCollection, setSelectCollection] = useState({
    state: false,
    collection: {},
  });

  const fetchData = () => {
    const data = localStorage.getItem("collectionList");
    const convertCollections = JSON.parse(data);

    if (convertCollections) {
      setCollections(convertCollections);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  if (collections.length > 0) {
    return (
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg opacity-95">
        {selectCollection.state ? (
          <CollectionItem selectedCollection={selectCollection.collection} />
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                className="w-full sm:w-5/12 bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 
            flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-blue-700 capitalize">
                        {col.title}
                      </h3>
                      <span className="text-xs font-medium text-blue-400">
                        Koleksiyon
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 font-semibold whitespace-nowrap">
                      🗂️ {col.cards.length} kart
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  {col.cards.length > 0 ? (
                    <button
                      className="px-4 py-1.5 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-md transition-colors"
                      onClick={() => handleMoveToPractice(col)}
                    >
                      Pratik Yap
                    </button>
                  ) : null}

                  <button
                    className="px-4 py-1.5 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md transition-colors"
                    onClick={() => handleSelectCollection(col)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="px-4 py-1.5 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors"
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
      <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed border-purple-300 rounded-xl shadow-sm">
        <div className="text-purple-500 mb-4 text-4xl">📂</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Henüz bir koleksiyonunuz yok
        </h2>
        <p className="text-gray-600 mb-4">
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
    );
  }
}

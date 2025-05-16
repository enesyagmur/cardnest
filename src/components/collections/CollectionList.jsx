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

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {selectCollection.state ? (
        <CollectionItem selectedCollection={selectCollection.collection} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="bg-gradient-to-tr from-white to-blue-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 capitalize">
                    {col.title}
                  </h3>
                  <span className="inline-block text-xs font-medium text-blue-400">
                    Koleksiyon
                  </span>
                </div>
                <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  🗂️ {col.cards.length} kart
                </div>
              </div>

              <p className="text-gray-600 mt-1 line-clamp-2">
                {col.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  onClick={() => handleMoveToPractice(col)}
                >
                  Pratik Yap
                </button>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  onClick={() => handleSelectCollection(col)}
                >
                  Düzenle
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

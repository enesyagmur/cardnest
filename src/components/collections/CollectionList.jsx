import { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";

export default function CollectionList() {
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

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {selectCollection.state ? (
        <CollectionItem selectedCollection={selectCollection.collection} />
      ) : (
        collections.map((col) => (
          <div
            key={col.id}
            onClick={() => handleSelectCollection(col)}
            className="cursor-pointer p-4 rounded-lg bg-white shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-600 capitalize">
              {col.title}
            </h3>
            <p className="text-gray-600">{col.description}</p>
            <p className="mt-2 text-sm text-gray-400">
              Kart sayısı: {col.cards.length}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

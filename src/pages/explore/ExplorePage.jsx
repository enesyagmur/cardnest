import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/exploreComponents/SearchBar";
import CollectionInExplore from "../../components/exploreComponents/CollectionInExplore";
import CollectionDetail from "../../components/exploreComponents/CollectionDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCollections } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Hepsi");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const publicCollections = useSelector(
    (state) => state.collections.publicCollections
  );
  const dispatch = useDispatch();

  const takePublicCollections = async () => {
    try {
      await dispatch(fetchPublicCollections()).unwrap();
    } catch (err) {
      NotifyCustom(
        "error",
        `Explore | Public koleksiyonlar getirilirken hata: ${err}`
      );
      console.log(err);
    }
  };

  useEffect(() => {
    takePublicCollections();
  }, []);

  const filteredCollections = publicCollections.filter(
    (collection) =>
      (selectedTag === "Hepsi" || collection.tags.includes(selectedTag)) &&
      collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full h-full bg-gray-100 flex flex-col items-center justify-start rounded-3xl shadow-sm">
      {!selectedCollection ? (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            selected={selectedTag}
            onSelect={setSelectedTag}
          />

          <div className="w-full flex flex-wrap justify-center gap-6 mt-4">
            {filteredCollections.map((collection, index) => (
              <CollectionInExplore
                key={index}
                {...collection}
                onClick={() => setSelectedCollection(collection)}
              />
            ))}
          </div>
        </>
      ) : (
        <CollectionDetail
          collection={selectedCollection}
          onBack={() => setSelectedCollection(null)}
        />
      )}
    </main>
  );
};

export default ExplorePage;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/exploreComponents/SearchBar";
import TagFilterBar from "../../components/exploreComponents/TagFilterBar";
import CollectionInExplore from "../../components/exploreComponents/CollectionInExplore";
import CollectionDetail from "../../components/exploreComponents/CollectionDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCollections } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Hepsi");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const publicCollections = useSelector(
    (state) => state.collections.publicCollections
  );
  const dispatch = useDispatch();

  const tags = ["Hepsi", "İngilizce", "Tarih", "Bilim", "Teknoloji"];

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-pink-200">
      <Header />
      <main className="w-11/12 min-h-[590px] bg-gray-100 flex flex-col items-center justify-start rounded-3xl shadow-sm">
        {!selectedCollection ? (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TagFilterBar
              tags={tags}
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
      <Footer />
    </div>
  );
};

export default Explore;

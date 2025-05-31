import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/exploreComponents/SearchBar";
import CollectionInExplore from "../../components/exploreComponents/CollectionInExplore";
import CollectionDetail from "../../components/exploreComponents/CollectionDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicCollections } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import Loading from "../../components/Loading";
import NoCollectionsFound from "../../components/exploreComponents/NoCollectionsFound";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Hepsi");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const { publicCollections, isLoading } = useSelector(
    (state) => state.collections
  );
  const [filteredCollections, setFilteredCollections] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchedCollections = publicCollections.filter((col) => {
      const title = col.title.toLowerCase();
      const tags = col.tags.toLowerCase();
      const search = searchTerm.toLowerCase();
      const tag = selectedTag.toLowerCase();

      const searchMatch =
        search === "" || title.includes(search) || tags.includes(search);

      const tagMatch =
        tag === "hepsi" || tags.includes(tag) || title.includes(tag);

      return searchMatch && tagMatch;
    });

    setFilteredCollections(searchedCollections);
  }, [searchTerm, selectedTag, publicCollections]);

  useEffect(() => {
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
    if (publicCollections.length === 0) {
      takePublicCollections();
    } else {
      setFilteredCollections(publicCollections);
    }
  }, [dispatch, publicCollections]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <main className="w-full px-2 md:pl-0  h-[590px] overflow-y-auto bg-gray-100 flex flex-col items-center justify-start rounded-xl shadow-sm">
        {!selectedCollection ? (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              selected={selectedTag}
              onSelect={setSelectedTag}
            />

            <div className="w-full flex flex-wrap justify-center gap-6 mt-4">
              {publicCollections.length > 0 &&
              filteredCollections.length === 0 ? (
                <NoCollectionsFound />
              ) : (
                filteredCollections?.map((collection, index) => (
                  <CollectionInExplore
                    key={index}
                    {...collection}
                    onClick={() => setSelectedCollection(collection)}
                  />
                ))
              )}
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
  }
};

export default ExplorePage;

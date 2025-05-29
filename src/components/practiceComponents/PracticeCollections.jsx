import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCollectionId } from "../../features/collections/collectionsSlice";
import { FaUser, FaHeart } from "react-icons/fa";
import CollectionCard from "./CollectionCard";

const PracticeCollections = ({ collections, favoriteCollections = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my");

  const handleSelect = (id) => {
    dispatch(setCollectionId(id));
    navigate("/practice");
  };

  const tabs = [
    {
      key: "my",
      label: "Koleksiyonlarım",
      icon: FaUser,
      color: "pink",
      data: collections,
    },
    {
      key: "favorites",
      label: "Favorilerim",
      icon: FaHeart,
      color: "red",
      data: favoriteCollections,
    },
  ];

  const activeData = tabs.find((tab) => tab.key === activeTab)?.data || [];

  const getTabStyles = (tabKey, color) => {
    const isActive = activeTab === tabKey;
    const baseStyles =
      "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 focus:outline-none";

    if (isActive) {
      return `${baseStyles} bg-${color}-500 text-white shadow-lg`;
    } else {
      return `${baseStyles} text-${color}-600 hover:bg-${color}-50 hover:text-${color}-700`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 max-h-[590px] flex flex-col">
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          <span className="text-pink-500">Pratik</span> Yapmaya Hazır mısın?
        </h1>
        <p className="text-gray-600 text-sm">
          Koleksiyonlarından birini seç ve öğrenmeye başla
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-gray-100 rounded-2xl max-w-md mx-auto flex-shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={getTabStyles(tab.key, tab.color)}
              type="button"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="ml-1 text-xs opacity-75">
                ({tab.data.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="w-11/12 flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden">
        {activeData.length > 0 ? (
          <div className="mx-auto m-2 w-full pb-4">
            {activeData.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                isFromFavorites={activeTab === "favorites"}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {activeTab === "my" ? (
                  <FaUser className="w-6 h-6 text-gray-400" />
                ) : (
                  <FaHeart className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === "my"
                    ? "Henüz koleksiyonun yok"
                    : "Henüz favori koleksiyonun yok"}
                </h3>
                <p className="text-gray-500 text-sm max-w-md">
                  {activeTab === "my"
                    ? "İlk koleksiyonunu oluşturmak için ana sayfaya git ve yeni bir koleksiyon ekle."
                    : "Keşfet sayfasından beğendiğin koleksiyonları favorilerine ekleyebilirsin."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeCollections;

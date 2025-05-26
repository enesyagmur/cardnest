import React from "react";
import { useDispatch } from "react-redux";
import { setCollection } from "../../features/selectCollectionSlice";
import { useNavigate } from "react-router-dom";

const PracticeCollections = ({ collections }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (collection) => {
    dispatch(setCollection(collection));
    navigate("/practice");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl  sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
        <span className="text-pink-400">Pratik</span> Yapmak için Bir Koleksiyon
        Seçiniz
      </h1>

      <div className="flex flex-col gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            onClick={() => handleSelect(collection)}
            className="cursor-pointer border border-gray-200 shadow-sm hover:border-pink-300 hover:shadow-sm transition-all duration-200 bg-white rounded-xl p-5"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-1">
                {collection.title}
              </h2>
              {collection.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {collection.description}
                </p>
              )}
            </div>
            <div className="mt-3 text-sm text-pink-400 font-medium self-end">
              {collection.cards?.length || 0} kart
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeCollections;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCollectionId } from "../../features/collections/collectionsSlice";
import { FaUser } from "react-icons/fa";
import CollectionCard from "./CollectionCard";

const PracticeCollections = ({ collections }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    dispatch(setCollectionId(id));
    navigate("/practice");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center  px-4 py-6 h-[590px] ">
      {/* Başlık */}
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          <span className="text-pink-500">Pratik</span> Yapmaya Hazır mısın?
        </h1>
        <p className="text-gray-600 text-sm">
          Koleksiyonlarından birini seç ve öğrenmeye başla
        </p>
      </div>

      {/* Koleksiyonlar */}
      <div className="w-11/12 md:w-8/12 flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden">
        {collections.length > 0 ? (
          <div className="mx-auto m-2 w-full pb-4">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <FaUser className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Henüz koleksiyonun yok
                </h3>
                <p className="text-gray-500 text-sm max-w-md">
                  İlk koleksiyonunu oluşturmak için ana sayfaya git ve yeni bir
                  koleksiyon ekle.
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

import { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";
import CardList from "./CardList";
import CardForm from "../cardForm/CardForm";
import { useSelector } from "react-redux";

const CollectionItem = ({ selectCollectionId, setSelectCollectionId }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const collections = useSelector((state) => state.collections.collections);

  const selectedCollection = collections.find(
    (item) => item.id === selectCollectionId
  );

  if (!selectedCollection) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Seçilen koleksiyon bulunamadı.</p>
        <button
          className="mt-2 flex items-center text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
          onClick={() => setSelectCollectionId("")}
        >
          <FiArrowLeft className="mr-1" />
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[570px] rounded-lg shadow-md sm:p-6">
      <header className="mb-4 flex justify-between items-start flex-wrap gap-4">
        <div>
          <h3 className="text-3xl font-bold text-blue-700 capitalize">
            {selectedCollection.title}
          </h3>
          <p className="text-gray-600">{selectedCollection.description}</p>

          <button
            className="mt-2 flex items-center text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setSelectCollectionId("")}
          >
            <FiArrowLeft className="mr-1" />
            Geri Dön
          </button>
        </div>

        <div className="space-x-3 flex">
          {!showCardForm && (
            <button
              onClick={() => setShowCardForm(true)}
              className="text-sm px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white transition-colors"
            >
              Kart Ekle
            </button>
          )}
        </div>
      </header>

      {!showCardForm && <CardList selectedCollection={selectedCollection} />}

      {showCardForm && (
        <div className="mt-4 border-t border-gray-300 sm:pt-6 bg-white sm:px-6 sm:pb-6">
          <CardForm
            collection={selectedCollection}
            setShowCardForm={setShowCardForm}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionItem;

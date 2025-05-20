import { useState } from "react";
import CardForm from "./cardForm/CardForm"; // yolunu projene göre ayarla
import CardList from "./CardList";
import { FiArrowLeft } from "react-icons/fi";

const CollectionItem = ({ selectedCollection, setSelectCollection }) => {
  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <div className="w-full min-h-[570px]  rounded-lg shadow-md sm:p-6 ">
      <header className="mb-4 flex justify-between items-start flex-wrap gap-4">
        {/* Sol taraf: Başlık, açıklama, geri butonu */}
        <div>
          <h3 className="text-3xl font-bold text-blue-700 capitalize">
            {selectedCollection.title}
          </h3>
          <p className="text-gray-600">{selectedCollection.description}</p>
          {/* Sade Geri Dön Butonu */}
          <button
            className="mt-2 flex items-center text-sm  bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() =>
              setSelectCollection({
                state: false,
                collection: {},
              })
            }
          >
            <FiArrowLeft className="mr-1" />
            Geri Dön
          </button>
        </div>

        {/* Sağ taraf: Kart Ekle butonu */}
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
      {/* Kart ekleme formu burada açılıp kapanacak */}
      {showCardForm && (
        <div className="mt-4 border-t border-gray-300 sm:pt-6 bg-white  sm:px-6 sm:pb-6">
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

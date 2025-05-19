import { useState } from "react";
import CardForm from "./cardForm/CardForm"; // yolunu projene göre ayarla
import CardList from "./CardList";

const CollectionItem = ({ selectedCollection }) => {
  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <div className="w-full min-h-[570px]  rounded-lg shadow-md sm:p-6  ">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold text-blue-700 capitalize">
            {selectedCollection.title}
          </h3>
          <p className="text-gray-600">{selectedCollection.description}</p>
        </div>
        <div className="space-x-3 flex">
          {!showCardForm && (
            <button
              onClick={() => setShowCardForm(true)}
              className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white transition-colors"
            >
              Kart Ekle
            </button>
          )}
        </div>
      </header>

      {!showCardForm && <CardList cards={selectedCollection.cards} />}
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

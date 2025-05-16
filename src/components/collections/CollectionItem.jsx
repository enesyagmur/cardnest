import { useState } from "react";
import CardForm from "./CardForm"; // yolunu projene göre ayarla
import CardList from "./CardList";

const CollectionItem = ({ selectedCollection }) => {
  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <div className="max-w-3xl container mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
      <header className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-blue-700 capitalize">
            {selectedCollection.title}
          </h3>
          <p className="text-gray-600">{selectedCollection.description}</p>
        </div>
        <div className="space-x-3 flex">
          <button
            onClick={() => setShowCardForm(!showCardForm)}
            className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white transition-colors"
          >
            Kart Ekle
          </button>
        </div>
      </header>
      {!showCardForm && <CardList cards={selectedCollection.cards} />}
      {/* Kart ekleme formu burada açılıp kapanacak */}
      {showCardForm && (
        <div className="mt-4 border-t border-gray-300 pt-6 bg-white  px-6 pb-6">
          <CardForm collection={selectedCollection} />
        </div>
      )}
    </div>
  );
};

export default CollectionItem;

import { useState } from "react";
import CardDetail from "./CardDetail";
const CollectionDetail = ({ collection, onBack }) => {
  const [showCardBackId, setShowCardBackId] = useState("");
  return (
    <div className="w-full min-h-[590px] overflow-y-auto bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center capitalize">
        {collection.title}
      </h2>

      <div className="flex justify-center items-start relative">
        <button
          onClick={onBack}
          className="w-28 bg-gray-100 text-gray-700 font-medium py-1 absolute left-0 rounded-md hover:bg-gray-200 transition"
          aria-label="Koleksiyon detayından geri dön"
        >
          ← Geri
        </button>
        <p className="text-gray-700 w-full text-center">
          {collection.description}
        </p>
      </div>

      <div className="w-full min-h-[450px] overflow-y-auto  py-4 px-2">
        <h3 className="text-xl font-semibold mb-2 ">Kartlar:</h3>

        {collection.cards.map((card) => (
          <div
            key={card.id}
            className="w-full max-h-[350px] overflow-y-auto bg-gray-100 flex flex-col items-center justify-between"
          >
            <div className="w-11/12 h-[50px] flex items-center justify-between">
              <p className="font-semibold capitalize text-xl">{card.front}</p>
              <button
                onClick={() =>
                  setShowCardBackId((prev) => (prev === card.id ? "" : card.id))
                }
              >
                Kapat
              </button>
            </div>
            {showCardBackId === card.id && <CardDetail card={card} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;

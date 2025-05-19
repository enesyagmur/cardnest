import { FiEdit } from "react-icons/fi";
import CardDeleteButton from "./CardDeleteButton";

const SİngleCardInList = ({ selectedCollectionId, card }) => {
  return (
    <div
      key={card.id}
      className="border border-gray-200 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all w-full"
    >
      <div className="flex  gap-4">
        {/* Kart Başlığı */}
        <div className="h-full w-10/12 flex items-center justify-start ">
          <h4 className="font-semibold text-xl text-blue-700 break-words">
            {card.front}
          </h4>
        </div>

        {/* Butonlar */}
        <div className="h-full w-2/12 flex items-center justify-center  gap-2">
          <button className="flex items-center gap-2 text-sm px-4 py-1.5 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md transition-colors">
            <FiEdit className="text-base" />
            Düzenle
          </button>
          <CardDeleteButton
            selectedCollectionId={selectedCollectionId}
            cardId={card.id}
          />
        </div>
      </div>
    </div>
  );
};

export default SİngleCardInList;

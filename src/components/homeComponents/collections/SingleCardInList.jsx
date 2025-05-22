import { FiEdit } from "react-icons/fi";
import CardDeleteButton from "./CardDeleteButton";

const SingleCardInList = ({ selectedCollectionId, card }) => {
  return (
    <div
      key={card.id}
      className="border border-gray-200 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all w-full"
    >
      <div className="flex flex-col md:flex-row gap-4 sm:gap-2">
        {/* Kart Başlığı */}
        <div className="w-full sm:w-10/12 flex items-center justify-start">
          <h4 className="font-semibold text-lg sm:text-xl text-blue-700 break-words">
            {card.front}
          </h4>
        </div>

        {/* Butonlar */}
        <div className="w-full md:w-2/12 flex sm:items-center sm:justify-end gap-2">
          <button className="flex items-center justify-center gap-1 text-sm px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md transition-colors ">
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

export default SingleCardInList;

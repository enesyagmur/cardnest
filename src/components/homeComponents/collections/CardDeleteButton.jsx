import { FiXCircle } from "react-icons/fi";
import { getCollectionList } from "../../../lib/getCollectionList";

const CardDeleteButton = ({ selectedCollectionId, cardId }) => {
  const handleDeleteCard = () => {
    const data = getCollectionList();
    if (!data) {
      console.error("Silmek için veri getirilemedi");
    }

    const newData = data.map((collection) =>
      collection.id === selectedCollectionId
        ? {
            ...collection,
            cards: collection.cards.filter((card) => card.id !== cardId),
          }
        : collection
    );

    localStorage.setItem("collectionList", JSON.stringify(newData));
  };

  return (
    <button
      onClick={handleDeleteCard}
      className="flex items-center gap-2 text-sm px-4 py-1.5 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors"
    >
      <FiXCircle className="text-base" />
      Kaldır
    </button>
  );
};

export default CardDeleteButton;

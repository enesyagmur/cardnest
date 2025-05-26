import { useState } from "react";
import PracticeCard from "./PracticeCard";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../../utils/NotifyCustom";
import { cardUpdate } from "../../features/collections/collectionsThunks";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { setCollection } from "../../features/selectCollectionSlice";

export default function PracticeItem({
  collectionId,
  card,

  createRandomNumber,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleSelectedDifficulty = async (selectedDifficulty) => {
    setShowAnswer(false);
    createRandomNumber();

    if (selectedDifficulty !== card.difficulty) {
      const values = { difficulty: selectedDifficulty };
      const userId = user.uid;
      const cardId = card.id;
      const colId = collectionId;

      try {
        await dispatch(cardUpdate({ userId, colId, cardId, values }));
      } catch (err) {
        NotifyCustom("error", `Zorluk güncellenemedi hata: ${err}`);
      }
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return <FaSmile className="text-green-100" title="Kolay" />;
      case "medium":
        return <FaMeh className="text-yellow-100" title="Normal" />;
      case "hard":
        return <FaFrown className="text-red-100" title="Zor" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[590px] flex flex-col bg-gray-50 m-auto border-gray-200 rounded-2xl p-6 shadow-lg transition-all duration-300 space-y-6">
      <div className="w-full flex items-center justify-center ">
        <h2 className="flex text-xl font-bold  items-center gap-2 text-gray-800 ">
          {getDifficultyIcon(card.difficulty)}
          {card.front}
        </h2>
      </div>

      {/* Cevap butonları */}

      <div className="w-full flex relative">
        <button
          onClick={() => dispatch(setCollection({}))}
          className="flex items-center gap-2 absolute  left-[-2] md:left-0 text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all shadow-sm"
        >
          <FiArrowLeft className="w-4 h-4" />
          <p className="hidden lg:inline"> Koleksiyonlar</p>
        </button>
        {showAnswer && (
          <div className="w-full flex gap-2 items-center justify-center">
            <button
              onClick={() => handleSelectedDifficulty("easy")}
              className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-md hover:bg-green-200 transition"
            >
              Kolay
            </button>
            <button
              onClick={() => handleSelectedDifficulty("medium")}
              className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-md hover:bg-yellow-200 transition"
            >
              Normal
            </button>
            <button
              onClick={() => handleSelectedDifficulty("hard")}
              className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 transition"
            >
              Zor
            </button>
          </div>
        )}
      </div>

      {showAnswer && <PracticeCard card={card} />}

      {/* Cevabı göster butonu */}
      {!showAnswer && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAnswer(true)}
            className="px-5 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors shadow"
          >
            Cevabı Göster
          </button>
        </div>
      )}
    </div>
  );
}

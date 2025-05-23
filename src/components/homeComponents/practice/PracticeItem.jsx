import { useState } from "react";
import PracticeCard from "./PracticeCard";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../../../utils/NotifyCustom";
import { cardUpdate } from "../../../features/collections/collectionsThunks";
import { AiOutlineClose } from "react-icons/ai";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";

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
    <div className="relative w-11/12 flex flex-col bg-gradient-to-br min-h-[530px] from-white to-blue-50 border m-auto border-gray-200 rounded-2xl p-8 shadow-lg transition-all duration-300 space-y-8">
      <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
        {getDifficultyIcon(card.difficulty)}
        {card.front}
      </h2>

      {showAnswer && (
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => handleSelectedDifficulty("easy")}
            className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition"
          >
            Kolay
          </button>
          <button
            onClick={() => handleSelectedDifficulty("medium")}
            className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition"
          >
            Normal
          </button>
          <button
            onClick={() => handleSelectedDifficulty("hard")}
            className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition"
          >
            Zor
          </button>
        </div>
      )}

      {showAnswer && <PracticeCard card={card} />}

      <div className="flex flex-col items-center gap-4">
        {!showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors shadow"
          >
            Cevabı Göster
          </button>
        )}
      </div>
    </div>
  );
}

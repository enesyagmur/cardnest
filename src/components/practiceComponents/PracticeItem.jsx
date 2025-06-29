import { useState } from "react";
import PracticeCard from "./PracticeCard";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../../utils/NotifyCustom";
import { cardUpdate } from "../../features/collections/collectionsThunks";
import { FaSmile, FaMeh, FaFrown, FaEye } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { setCollectionId } from "../../features/collections/collectionsSlice";

export default function PracticeItem({
  collectionId,
  card,
  createRandomNumber,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSelectedDifficulty = async (selectedDifficulty) => {
    setLoading(true);

    setShowAnswer(false);
    createRandomNumber();
    setLoading(false);

    let values = {};
    if (selectedDifficulty !== card.difficulty) {
      values = {
        difficulty: selectedDifficulty,
        studyedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } else {
      values = {
        studyedAt: new Date().toISOString(),
      };
    }
    const userId = user.uid;
    const cardId = card.id;
    const colId = collectionId;

    try {
      await dispatch(cardUpdate({ userId, colId, cardId, values })).unwrap();
    } catch (err) {
      NotifyCustom("error", `Practice | Zorluk güncellenemedi hata: ${err}`);
    }
  };

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return {
          icon: FaSmile,
          color: "text-green-500",
          bgColor: "bg-green-50",
          label: "Kolay",
        };
      case "medium":
        return {
          icon: FaMeh,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
          label: "Normal",
        };
      case "hard":
        return {
          icon: FaFrown,
          color: "text-red-500",
          bgColor: "bg-red-50",
          label: "Zor",
        };
      default:
        return {
          icon: FaMeh,
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          label: "Bilinmiyor",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(card.difficulty);
  const DifficultyIcon = difficultyConfig.icon;

  return (
    <div className="relative w-full min-h-[590px] max-h-[590px] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 ">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch(setCollectionId(""))}
            className="flex items-center gap-2 text-sm px-3 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Koleksiyonlar</span>
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed md:mr-12">
            {!loading ? card.front : "Algoritma, yeni soruyu getiriyor..."}
          </h2>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 ${difficultyConfig.bgColor} rounded-full`}
          >
            <DifficultyIcon className={`w-4 h-4 ${difficultyConfig.color}`} />
            <span className={`text-sm font-medium ${difficultyConfig.color}`}>
              {difficultyConfig.label}
            </span>
          </div>
        </div>
      </div>

      {loading === false && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {showAnswer && (
            <div className="flex-1 overflow-y-auto">
              <PracticeCard card={card} />
            </div>
          )}

          <div className="flex-shrink-0 p-6 bg-gray-50 border-t border-gray-100">
            {!showAnswer ? (
              <div className="text-center">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="inline-flex items-center gap-2 md:px-6 px-3 md:py-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <FaEye className="w-4 h-4" />
                  Cevabı Göster
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Bu kartı ne kadar zor buldun?
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleSelectedDifficulty("easy")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-all duration-200 hover:scale-105"
                    >
                      <FaSmile className="w-4 h-4" />
                      <span className="hidden sm:inline">Kolay</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("medium")}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg hover:bg-yellow-200 transition-all duration-200 hover:scale-105"
                    >
                      <FaMeh className="w-4 h-4" />
                      <span className="hidden sm:inline">Normal</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("hard")}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-105"
                    >
                      <FaFrown className="w-4 h-4" />
                      <span className="hidden sm:inline">Zor</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

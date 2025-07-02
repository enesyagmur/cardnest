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
  practiceCardCount,
  totalCards,
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
          borderColor: "border-green-200",
          label: "Kolay",
        };
      case "medium":
        return {
          icon: FaMeh,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Normal",
        };
      case "hard":
        return {
          icon: FaFrown,
          color: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Zor",
        };
      default:
        return {
          icon: FaMeh,
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          label: "Bilinmiyor",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(card.difficulty);
  const DifficultyIcon = difficultyConfig.icon;
  const progressPercentage = (practiceCardCount / totalCards) * 100;

  return (
    <div className="relative w-full min-h-[590px] max-h-[590px] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Compact Header - Single Row */}
      <div className="flex-shrink-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back Button */}
          <button
            onClick={() => dispatch(setCollectionId(""))}
            className="flex items-center gap-2 text-sm px-3 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 flex-shrink-0"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Koleksiyonlar</span>
          </button>

          {/* Center: Question */}
          <div className="flex-1 min-w-0 mx-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center truncate">
                {!loading ? (
                  card.front
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-sm">Yeni soru getiriliyor...</span>
                  </div>
                )}
              </h2>
            </div>
          </div>

          {/* Right: Difficulty + Progress */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Difficulty Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 ${difficultyConfig.bgColor} ${difficultyConfig.borderColor} border rounded-full`}
            >
              <DifficultyIcon className={`w-4 h-4 ${difficultyConfig.color}`} />
              <span className={`text-sm font-medium ${difficultyConfig.color}`}>
                {difficultyConfig.label}
              </span>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 px-3 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">
                    {practiceCardCount}/{totalCards}
                  </div>
                  <div className="text-xs text-gray-500">
                    %{Math.round(progressPercentage)}
                  </div>
                </div>
                <div className="w-8 h-8 relative">
                  <svg
                    className="w-8 h-8 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${progressPercentage}, 100`}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">
                      {Math.round(progressPercentage)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                  className="inline-flex items-center gap-2 md:px-8 px-4 md:py-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <FaEye className="w-5 h-5" />
                  <span className="text-lg">Cevabı Göster</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-700 mb-4">
                    Bu kartı ne kadar zor buldun?
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => handleSelectedDifficulty("easy")}
                      className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-xl hover:bg-green-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <FaSmile className="w-5 h-5" />
                      <span>Kolay</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("medium")}
                      className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 font-semibold rounded-xl hover:bg-yellow-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <FaMeh className="w-5 h-5" />
                      <span>Normal</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("hard")}
                      className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <FaFrown className="w-5 h-5" />
                      <span>Zor</span>
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

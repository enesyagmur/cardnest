import { useState } from "react";
import PracticeCard from "./PracticeCard";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../../utils/NotifyCustom";
import { cardUpdate } from "../../features/collections/collectionsThunks";
import { HiOutlineX } from "react-icons/hi";
import { BiHappy, BiMeh, BiSad } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

export default function PracticeItem({
  collectionId,
  card,
  createRandomNumber,

  onBackToCollections,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!card) {
    return (
      <div className="text-center text-gray-500 py-8">Kart bulunamadı</div>
    );
  }

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
          icon: BiHappy,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          label: "Kolay",
        };
      case "medium":
        return {
          icon: BiMeh,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "Normal",
        };
      case "hard":
        return {
          icon: BiSad,
          color: "text-rose-600",
          bgColor: "bg-rose-50",
          borderColor: "border-rose-200",
          label: "Zor",
        };
      default:
        return {
          icon: BiMeh,
          color: "text-slate-600",
          bgColor: "bg-slate-50",
          borderColor: "border-slate-200",
          label: "Bilinmiyor",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(card.difficulty);
  const DifficultyIcon = difficultyConfig.icon;

  return (
    <div className="relative w-full min-h-[590px] max-h-[590px] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Section - Tek Satır */}
      <div className="flex-shrink-0 px-3 py-3 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 border-b border-gray-200">
        <div className="flex items-center justify-between gap-3">
          {/* Sol: Zorluk Badge */}
          <div className="flex-shrink-0">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 ${difficultyConfig.bgColor} ${difficultyConfig.borderColor} border rounded-lg shadow-sm`}
            >
              <DifficultyIcon className={`w-4 h-4 ${difficultyConfig.color}`} />
              <span
                className={`text-sm font-medium ${difficultyConfig.color} hidden sm:inline`}
              >
                {difficultyConfig.label}
              </span>
            </div>
          </div>

          {/* Orta: Soru/Front */}
          <div className="flex-1 min-w-0 mx-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-gray-200 shadow-sm">
              <div className="text-center">
                {!loading ? (
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 leading-tight break-words line-clamp-2">
                    {card.front}
                  </h2>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                    <span className="text-sm text-gray-600">
                      Yeni soru getiriliyor...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ: Bitir Butonu */}
          <div className="flex-shrink-0">
            <button
              onClick={onBackToCollections}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg hover:shadow-md transition-all duration-200 border border-emerald-600 font-medium"
            >
              <HiOutlineX className="w-4 h-4" />
              <span className="hidden sm:inline">Bitir</span>
            </button>
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

          {/* Bottom section - Minimized */}
          <div className="flex-shrink-0 p-3 bg-gradient-to-br from-gray-50 to-purple-50 border-t border-gray-100">
            {!showAnswer ? (
              <div className="text-center">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <AiOutlineEye className="w-4 h-4" />
                  <span className="text-base">Cevabı Göster</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Bu kartı ne kadar zor buldun?
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleSelectedDifficulty("easy")}
                      className="flex items-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md border border-emerald-200"
                    >
                      <BiHappy className="w-4 h-4" />
                      <span className="text-sm">Kolay</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("medium")}
                      className="flex items-center gap-1 px-4 py-2 bg-amber-100 text-amber-700 font-semibold rounded-xl hover:bg-amber-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md border border-amber-200"
                    >
                      <BiMeh className="w-4 h-4" />
                      <span className="text-sm">Normal</span>
                    </button>
                    <button
                      onClick={() => handleSelectedDifficulty("hard")}
                      className="flex items-center gap-1 px-4 py-2 bg-rose-100 text-rose-700 font-semibold rounded-xl hover:bg-rose-200 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md border border-rose-200"
                    >
                      <BiSad className="w-4 h-4" />
                      <span className="text-sm">Zor</span>
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

import { useState } from "react";
import PracticeCard from "./PracticeCard";

export default function PracticeItem({ card, createRandomNumberFunc }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelectedDificulty = () => {
    setShowAnswer(false);
    createRandomNumberFunc();
  };

  return (
    <div className="flex flex-col bg-gradient-to-br min-h-[700px] from-white to-blue-50 border m-auto border-gray-200 rounded-2xl p-8 shadow-lg transition-all duration-300 space-y-8">
      {/* Soru */}
      <h2 className="text-2xl font-bold text-blue-800 text-center">
        {card.front}
      </h2>

      {/* Cevap */}
      {showAnswer && <PracticeCard card={card} />}

      {/* Butonlar */}
      <div className="flex flex-col items-center gap-4">
        {/* Cevabı Göster */}
        {!showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors shadow"
          >
            Cevabı Göster
          </button>
        )}

        {/* Zorluk Seçimi */}
        {showAnswer && (
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => handleSelectedDificulty("easy")}
              className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition"
            >
              Kolay
            </button>
            <button
              onClick={() => handleSelectedDificulty("normal")}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200 transition"
            >
              Normal
            </button>
            <button
              onClick={() => handleSelectedDificulty("hard")}
              className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition"
            >
              Zor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

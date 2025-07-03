import React from "react";
import { FaBookOpen, FaHeart, FaPlay } from "react-icons/fa";
import { BiHappy, BiMeh, BiSad } from "react-icons/bi";

const CollectionCard = ({
  collection,
  isFromFavorites = false,
  handleSelect,
}) => {
  const cards = collection.cards || [];

  const totalCards = cards.length;

  const difficultyCount = cards.reduce(
    (acc, card) => {
      if (card.difficulty === "easy") acc.easy += 1;
      else if (card.difficulty === "medium") acc.medium += 1;
      else if (card.difficulty === "hard") acc.hard += 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );

  const percentage = (count) =>
    totalCards === 0 ? 0 : Math.round((count / totalCards) * 100);

  return (
    <div
      key={collection.id}
      onClick={() => handleSelect(collection.id)}
      className="m-4 group cursor-pointer border border-gray-200 shadow-sm hover:border-pink-300 hover:shadow-md transition-all duration-300 bg-white rounded-xl p-5 hover:scale-[1.01]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FaBookOpen className="w-4 h-4 text-pink-400" />
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {collection.title}
            </h2>
            {isFromFavorites && <FaHeart className="w-4 h-4 text-red-400" />}
          </div>

          {collection.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {collection.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex  text-sm text-gray-500 gap-1">
              <div className="flex items-center gap-2">
                <FaBookOpen className="w-3 h-3" />
                <span>{totalCards} kart</span>
              </div>
              {totalCards > 0 && (
                <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                  <span className="w-16 flex items-center justify-center">
                    %{percentage(difficultyCount.easy)}
                    <BiHappy className="text-emerald-500 ml-1" />
                  </span>
                  <span className="w-16 flex items-center justify-center">
                    %{percentage(difficultyCount.medium)}
                    <BiMeh className="text-amber-500 ml-1" />
                  </span>
                  <span className="w-16 flex items-center justify-center">
                    %{percentage(difficultyCount.hard)}
                    <BiSad className="text-rose-500 ml-1" />
                  </span>
                </div>
              )}
              {collection.createdBy && (
                <span className="text-xs text-gray-400">
                  {isFromFavorites ? `@${collection.createdBy}` : "Benim"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-pink-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <FaPlay className="w-3 h-3" />
              <span>Başla</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;

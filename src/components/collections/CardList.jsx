const CardList = ({ cards }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-6">
      {cards.length === 0 && (
        <p className="text-gray-500 italic text-center">
          Bu koleksiyonda henüz kart yok.
        </p>
      )}

      {cards.map((card) => (
        <div
          key={card.id}
          className="border border-gray-200 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-xl text-blue-700">
              {card.front}
            </h4>

            <div className="flex-shrink-0 space-x-2">
              <button className="text-sm px-4 py-1.5 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md transition-colors">
                Düzenle
              </button>
              <button className="text-sm px-4 py-1.5 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors">
                Sil
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{card.back}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;

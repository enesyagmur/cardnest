const CardList = ({ cards }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-6">
      {cards.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl shadow-sm mt-10 max-w-xl mx-auto">
          <div className="text-4xl text-gray-400 mb-4">🃏</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Bu koleksiyonda henüz kart bulunmuyor
          </h2>
          <p className="text-gray-500 mb-4">
            Kart ekleyerek bu koleksiyonu zenginleştirebilirsiniz.
          </p>
        </div>
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
        </div>
      ))}
    </div>
  );
};

export default CardList;

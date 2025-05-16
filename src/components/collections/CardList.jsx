const CardList = ({ cards }) => {
  return (
    <div className="space-y-4">
      {cards.length === 0 && (
        <p className="text-gray-500 italic">Bu koleksiyonda henüz kart yok.</p>
      )}

      {cards.map((card) => (
        <div
          key={card.id}
          className="border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center bg-gray-50"
        >
          <div>
            <div className="flex space-x-2 justify-between">
              <h4 className="font-semibold text-lg text-gray-800">
                {card.front}
              </h4>
              <div>
                <button className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md text-white transition-colors">
                  Düzenle
                </button>
                <button className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white transition-colors ml-2">
                  Sil
                </button>
              </div>
            </div>

            <p className="text-gray-600 mt-1">{card.back}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;

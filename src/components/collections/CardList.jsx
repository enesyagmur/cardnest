import SİngleCardInList from "./SİngleCardInList";

const CardList = ({ selectedCollection }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-6">
      {selectedCollection.cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl shadow-sm mt-10 max-w-xl mx-auto">
          <div className="text-4xl text-gray-400 mb-4">🃏</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Bu koleksiyonda henüz kart bulunmuyor
          </h2>
          <p className="text-gray-500 mb-4">
            Kart ekleyerek bu koleksiyonu zenginleştirebilirsiniz.
          </p>
        </div>
      ) : (
        selectedCollection.cards.map((card) => (
          <SİngleCardInList
            selectedCollectionId={selectedCollection.id}
            card={card}
            key={card.id}
          />
        ))
      )}
    </div>
  );
};

export default CardList;

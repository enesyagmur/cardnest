export default function CollectionList() {
  // Örnek koleksiyon verisi
  const collections = [
    {
      id: 1,
      title: "Matematik Kartları",
      description: "Temel matematik konuları",
      cards: [
        { id: 1, title: "Kareköklü Sayılar", difficulty: "kolay" },
        { id: 2, title: "Denklemler", difficulty: "orta" },
      ],
    },
    {
      id: 2,
      title: "İngilizce Kelimeler",
      description: "Günlük İngilizce kelimeler",
      cards: [
        { id: 3, title: "Ev eşyaları", difficulty: "kolay" },
        { id: 4, title: "Yiyecekler", difficulty: "zor" },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {collections.map((col) => (
        <div
          key={col.id}
          className="cursor-pointer p-4 rounded-lg bg-white shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-blue-600">{col.title}</h3>
          <p className="text-gray-600">{col.description}</p>
          <p className="mt-2 text-sm text-gray-400">
            Kart sayısı: {col.cards.length}
          </p>
        </div>
      ))}
    </div>
  );
}

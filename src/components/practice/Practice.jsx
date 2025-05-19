import { useEffect, useRef, useState } from "react";
import PracticeItem from "./PracticeItem";

export default function Practice({ collection, setPage }) {
  const [rnd, setRnd] = useState(0);
  const containerRef = useRef(null);

  const createRandomNumber = () => {
    if (collection.cards.length > 0) {
      setRnd(Math.floor(Math.random() * collection.cards.length));
    }
  };

  useEffect(() => {
    if (collection.title && collection.cards.length > 0) {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [collection]);

  console.log(collection.cards);

  return (
    <div
      ref={containerRef}
      className="w-full  min-h-[590px] bg-gradient-to-br from-white to-blue-50 p-10 rounded-3xl shadow-xl "
    >
      {collection.title ? (
        <PracticeItem
          card={collection.cards[rnd]}
          createRandomNumberFunc={createRandomNumber}
        />
      ) : (
        <div className="w-full min-h-[510px] flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed border-purple-300 rounded-xl shadow-sm  ">
          <div className="text-purple-500 text-4xl mb-4">📂</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Henüz bir koleksiyon seçilmedi
          </h2>
          <p className="text-gray-600 mb-6">
            Koleksiyonlarınızı görmek ya da yeni bir koleksiyon oluşturmak için
            aşağıdaki seçeneklerden birini kullanabilirsiniz.
          </p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              onClick={() => setPage("collectionList")}
            >
              Koleksiyonlara Git
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={() => setPage("collectionForm")}
            >
              Koleksiyon Oluştur
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

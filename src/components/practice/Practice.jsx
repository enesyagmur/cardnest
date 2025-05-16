import { useEffect, useRef, useState } from "react";
import PracticeItem from "./PracticeItem";

export default function Practice({ collection }) {
  const [rnd, setRnd] = useState(0);
  const containerRef = useRef(null);

  const createRandomNumber = () => {
    if (collection.cards.length > 0) {
      setRnd(Math.floor(Math.random() * collection.cards.length));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [collection]);

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-white to-blue-50 p-10 rounded-3xl shadow-xl mt-10"
    >
      {collection.title ? (
        <PracticeItem
          card={collection.cards[rnd]}
          createRandomNumberFunc={createRandomNumber}
        />
      ) : (
        <div className="text-center text-gray-500 text-lg mt-20">
          <p>📂 Henüz bir koleksiyon seçilmedi.</p>
        </div>
      )}
    </div>
  );
}

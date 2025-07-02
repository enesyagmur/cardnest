import PracticeItem from "../../components/practiceComponents/PracticeItem";
import EmptyPractice from "../../components/practiceComponents/EmptyPractice";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotifyCustom from "../../utils/NotifyCustom";
import PracticeCollections from "../../components/practiceComponents/PracticeCollections";

export default function PracticePage() {
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );
  const [practiceCardCount, setPracticeCardCount] = useState(0);

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  const [rnd, setRnd] = useState(0);

  const createRandomNumber = () => {
    if (!selectedCollection.cards.length) return;
    setPracticeCardCount(practiceCardCount + 1);

    const hardCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "hard"
    );
    const mediumCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "medium"
    );
    const easyCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "easy"
    );

    // Kart grubu yoksa hata göster
    if (!hardCards.length && !mediumCards.length && !easyCards.length) {
      NotifyCustom("error", "Kart bulunamadı");
      return;
    }

    // Zorluklara göre sabit oranla grup seç (hızlı ve dengeli)
    const randomValue = Math.random();
    let selectedGroup = [];

    if (randomValue < 0.3 && hardCards.length) {
      selectedGroup = hardCards;
    } else if (randomValue < 0.7 && mediumCards.length) {
      selectedGroup = mediumCards;
    } else if (easyCards.length) {
      selectedGroup = easyCards;
    } else if (mediumCards.length) {
      selectedGroup = mediumCards;
    } else {
      selectedGroup = hardCards;
    }

    // Seçilen grubu önce rastgele karıştır, sonra tarihe göre biraz sıralı hale getir
    const shuffledGroup = [...selectedGroup].sort(() => Math.random() - 0.5);

    // Hafifçe tarihe öncelik ver (ilk 3 taneden en eskiyi al örneğin)
    const topFew = shuffledGroup.slice(0, 3).sort((a, b) => {
      const dateA = a.studyedAt ? new Date(a.studyedAt) : new Date(0);
      const dateB = b.studyedAt ? new Date(b.studyedAt) : new Date(0);
      return dateA - dateB;
    });

    const selectedCard = topFew[0]; // hem biraz random hem az çalışılmış

    const originalIndex = selectedCollection.cards.findIndex(
      (c) => c.id === selectedCard.id
    );
    setRnd(originalIndex);
  };

  return (
    <main className="w-full bg-gray-100 h-[590px] flex items-center justify-center rounded-xl shadow-sm ">
      {selectedCollection?.title && selectedCollection.cards?.length > 0 && (
        <PracticeItem
          collectionId={selectedCollection.id}
          card={selectedCollection.cards[rnd]}
          createRandomNumber={createRandomNumber}
          practiceCardCount={practiceCardCount}
          totalCards={selectedCollection.cards.length}
        />
      )}

      {(!selectedCollection?.id || !selectedCollection?.cards?.length) &&
        collections?.length > 0 && (
          <PracticeCollections collections={collections} />
        )}

      {(!selectedCollection?.id || !selectedCollection?.cards?.length) &&
        (!collections?.length || collections?.length === 0) && (
          <EmptyPractice />
        )}
    </main>
  );
}

import PracticeItem from "../../components/practiceComponents/PracticeItem";
import EmptyPractice from "../../components/practiceComponents/EmptyPractice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NotifyCustom from "../../utils/NotifyCustom";
import PracticeCollections from "../../components/practiceComponents/PracticeCollections";
import { setCollectionId } from "../../features/collections/collectionsSlice";

export default function PracticePage() {
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );
  const [usedCardIds, setUsedCardIds] = useState([]);
  const [rnd, setRnd] = useState(0);
  const dispatch = useDispatch();

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  const totalPracticeCount = selectedCollection?.cards?.length || 0;
  const currentPracticeCardCount = usedCardIds.length;

  const createRandomNumber = () => {
    if (!selectedCollection?.cards?.length) return;

    const availableCards = selectedCollection.cards.filter(
      (card) => !usedCardIds.includes(card.id)
    );

    if (!availableCards.length) {
      NotifyCustom("Success", "Tüm kartları bitirdiniz!");
      dispatch(setCollectionId(""));
      setUsedCardIds([]);
      return;
    }

    const hardCards = availableCards.filter((c) => c.difficulty === "hard");
    const mediumCards = availableCards.filter((c) => c.difficulty === "medium");
    const easyCards = availableCards.filter((c) => c.difficulty === "easy");

    if (!hardCards.length && !mediumCards.length && !easyCards.length) {
      NotifyCustom("error", "Kart bulunamadı");
      return;
    }

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

    const shuffledGroup = [...selectedGroup].sort(() => Math.random() - 0.5);
    const topFew = shuffledGroup.slice(0, 3).sort((a, b) => {
      const dateA = a.studyedAt ? new Date(a.studyedAt) : new Date(0);
      const dateB = b.studyedAt ? new Date(b.studyedAt) : new Date(0);
      return dateA - dateB;
    });

    const selectedCard = topFew[0];
    const originalIndex = selectedCollection.cards.findIndex(
      (c) => c.id === selectedCard.id
    );

    setRnd(originalIndex);
    setUsedCardIds((prev) => [...prev, selectedCard.id]);
  };

  const handleBackToCollections = () => {
    setUsedCardIds([]);
    dispatch(setCollectionId(""));
  };

  return (
    <main className="w-full bg-gray-100 h-[590px] flex items-center justify-center rounded-xl shadow-sm">
      {selectedCollection?.title &&
        selectedCollection.cards?.length > 0 &&
        selectedCollection.cards[rnd] && (
          <PracticeItem
            collectionId={selectedCollection.id}
            card={selectedCollection.cards[rnd]}
            createRandomNumber={createRandomNumber}
            totalPracticeCount={totalPracticeCount}
            currentPracticeCardCount={currentPracticeCardCount}
            onBackToCollections={handleBackToCollections}
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

import PracticeItem from "../../components/practiceComponents/PracticeItem";
import EmptyPractice from "../../components/practiceComponents/EmptyPractice";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotifyCustom from "../../utils/NotifyCustom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PracticeCollections from "../../components/practiceComponents/PracticeCollections";

export default function Practice() {
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  const [rnd, setRnd] = useState(0);

  const createRandomNumber = () => {
    if (!selectedCollection.cards.length) return;

    const hardCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "hard"
    );
    const mediumCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "medium"
    );
    const easyCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "easy"
    );

    const baseWeights = {
      hard: 0.6,
      medium: 0.3,
      easy: 0.1,
    };

    const weightedHard = baseWeights.hard * hardCards.length;
    const weightedMedium = baseWeights.medium * mediumCards.length;
    const weightedEasy = baseWeights.easy * easyCards.length;

    const totalWeight = weightedHard + weightedMedium + weightedEasy;
    if (totalWeight === 0) {
      NotifyCustom("error", "Kart Bulunamadı");
      return;
    }
    const rand = Math.random() * totalWeight;

    let selectedGroup = [];
    if (rand < weightedHard && hardCards.length > 0) {
      selectedGroup = hardCards;
    } else if (rand < weightedHard + weightedMedium && mediumCards.length > 0) {
      selectedGroup = mediumCards;
    } else if (easyCards.length > 0) {
      selectedGroup = easyCards;
    } else if (hardCards.length > 0) {
      selectedGroup = hardCards;
    } else if (mediumCards.length > 0) {
      selectedGroup = mediumCards;
    } else {
      selectedGroup = easyCards;
    }

    const randomIndex = Math.floor(Math.random() * selectedGroup.length);
    const card = selectedGroup[randomIndex];
    const originalIndex = selectedCollection.cards.findIndex(
      (c) => c.id === card.id
    );

    setRnd(originalIndex);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-pink-200">
      <Header />
      <main className="w-11/12 min-h-[590px] bg-gray-100 flex items-center justify-center rounded-3xl shadow-sm ">
        {selectedCollection?.title && selectedCollection.cards?.length > 0 && (
          <PracticeItem
            collectionId={selectedCollection.id}
            card={selectedCollection.cards[rnd]}
            createRandomNumber={createRandomNumber}
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
      <Footer />
    </div>
  );
}

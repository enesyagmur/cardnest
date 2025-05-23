import PracticeItem from "./PracticeItem";
import EmptyPractice from "./EmptyPractice";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotifyCustom from "../../../utils/NotifyCustom";

export default function Practice({ setPage }) {
  const collection = useSelector((state) => state.practiceCollection.col);
  const [rnd, setRnd] = useState(0);

  const createRandomNumber = () => {
    if (!collection.cards.length) return;

    const hardCards = collection.cards.filter((c) => c.difficulty === "hard");
    const mediumCards = collection.cards.filter(
      (c) => c.difficulty === "medium"
    );
    const easyCards = collection.cards.filter((c) => c.difficulty === "easy");

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
    const originalIndex = collection.cards.findIndex((c) => c.id === card.id);

    setRnd(originalIndex);
  };

  return (
    <div className="w-full min-h-[590px] flex items-center justify-center bg-gradient-to-br from-white to-pink-50 p-10 rounded-3xl shadow-sm ">
      {collection.title ? (
        <PracticeItem
          collectionId={collection.id}
          card={collection.cards[rnd]}
          createRandomNumber={createRandomNumber}
        />
      ) : (
        <EmptyPractice setPage={setPage} />
      )}
    </div>
  );
}

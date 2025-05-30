import PracticeItem from "../../components/practiceComponents/PracticeItem";
import EmptyPractice from "../../components/practiceComponents/EmptyPractice";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotifyCustom from "../../utils/NotifyCustom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PracticeCollections from "../../components/practiceComponents/PracticeCollections";

export default function PracticePage() {
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

    //zorluklarına göre filtreleyip kartları ayırrıyorum
    const hardCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "hard"
    );
    const mediumCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "medium"
    );
    const easyCards = selectedCollection.cards.filter(
      (c) => c.difficulty === "easy"
    );

    //zorluklara ağırlık değeri veriyorum
    const baseWeights = {
      hard: 0.6,
      medium: 0.3,
      easy: 0.1,
    };

    //ağırlıkları ile beraber barındırdıkları kart sayısına göre her zorluğun toplam yoğunluğunu buluyorum
    const weightedHard = baseWeights.hard * hardCards.length;
    const weightedMedium = baseWeights.medium * mediumCards.length;
    const weightedEasy = baseWeights.easy * easyCards.length;

    const totalWeight = weightedHard + weightedMedium + weightedEasy;
    if (totalWeight === 0) {
      NotifyCustom("error", "Kart Bulunamadı");
      return;
    }
    const rand = Math.random() * totalWeight;

    //random değere göre grup seçiyorum
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

    //seçilen gurupu son çalışma durumuna göre her seferinde sıralıyoruz
    const sortedGroup = [...selectedGroup].sort((a, b) => {
      const dateA = a.studyedAt ? new Date(a.studyedAt) : new Date(0); // eğer daha önce hiç çalışılmadıysa ya da studyedAt değeri yoksa
      const dateB = b.studyedAt ? new Date(b.studyedAt) : new Date(0);
      return dateA - dateB;
    });

    const card = sortedGroup[0]; // en eski çalışılan card ı alıyoruz

    const originalIndex = selectedCollection.cards.findIndex(
      (c) => c.id === card.id
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

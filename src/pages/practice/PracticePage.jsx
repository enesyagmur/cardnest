import PracticeItem from "../../components/practiceComponents/PracticeItem";
import EmptyPractice from "../../components/practiceComponents/EmptyPractice";
import { useDispatch, useSelector } from "react-redux";
import { useReducer, useState, useEffect } from "react";
import NotifyCustom from "../../utils/NotifyCustom";
import PracticeCollections from "../../components/practiceComponents/PracticeCollections";
import { setCollectionId } from "../../features/collections/collectionsSlice";
import { practiceReducer, initialState } from "../../reducers/practiceReducer";

export default function PracticePage() {
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );
  const [rnd, setRnd] = useState(0);
  const [state, dispatchReducer] = useReducer(practiceReducer, initialState);
  const { usedCards, lastShownCards, sessionRound, noMoreCardsForRound } =
    state;
  const dispatch = useDispatch();

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  useEffect(() => {
    if (
      selectedCollectionId &&
      selectedCollection?.cards?.length > 0 &&
      !noMoreCardsForRound
    ) {
      createRandomNumber();
    }
  }, [selectedCollectionId, sessionRound, noMoreCardsForRound]);

  const getAvailableCards = () => {
    if (!selectedCollection?.cards) return [];

    return selectedCollection.cards.filter(
      (card) =>
        !usedCards.includes(card.id) && !lastShownCards.includes(card.id)
    );
  };

  const getCardPriority = (card) => {
    const difficultyWeight = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const lastReviewDate = card.studyedAt ? new Date(card.studyedAt) : null;
    const now = new Date();

    let daysSinceLastReview = 100;
    if (lastReviewDate && lastReviewDate <= now) {
      daysSinceLastReview = (now - lastReviewDate) / (1000 * 60 * 60 * 24);
    } else if (lastReviewDate && lastReviewDate > now) {
      daysSinceLastReview = -100;
    }

    const randomFactor = Math.random() * 0.2;

    return (
      difficultyWeight[card.difficulty] * 100 +
      daysSinceLastReview * 10 +
      randomFactor
    );
  };

  const selectNextCard = () => {
    const availableCards = getAvailableCards();

    if (availableCards.length === 0) {
      if (usedCards.length > 0) {
        NotifyCustom(
          "info",
          "Bu turdaki tüm kartları bitirdiniz, yeni tura geçiliyor!"
        );
        dispatchReducer({ type: "NEXT_ROUND" });
        return null;
      } else {
        NotifyCustom(
          "info",
          "Bu koleksiyon için gösterilebilecek kart kalmadı!"
        );
        dispatchReducer({ type: "NO_MORE_CARDS_FOR_ROUND" });
        return null;
      }
    }

    const sortedCards = [...availableCards].sort((a, b) => {
      return getCardPriority(b) - getCardPriority(a);
    });

    const topCandidates = sortedCards.slice(0, Math.min(3, sortedCards.length));
    const selectedCard =
      topCandidates[Math.floor(Math.random() * topCandidates.length)];

    return selectedCard;
  };

  const createRandomNumber = () => {
    if (!selectedCollection?.cards?.length) return;

    const selectedCard = selectNextCard();

    if (!selectedCard) return;

    dispatchReducer({ type: "ADD_USED_CARD", payload: selectedCard.id });

    const originalIndex = selectedCollection.cards.findIndex(
      (c) => c.id === selectedCard.id
    );
    setRnd(originalIndex);
  };

  const handleBackToCollections = () => {
    dispatchReducer({ type: "RESET_SESSION" });
    dispatch(setCollectionId(""));
  };

  // rnd için güvenli index
  const validRnd =
    rnd >= 0 && rnd < (selectedCollection?.cards?.length || 0) ? rnd : 0;

  return (
    <main className="w-full bg-gray-100 h-[590px] flex items-center justify-center rounded-xl shadow-sm">
      {selectedCollection?.title &&
        selectedCollection.cards?.length > 0 &&
        selectedCollection.cards[validRnd] &&
        !noMoreCardsForRound && (
          <PracticeItem
            collectionId={selectedCollection.id}
            card={selectedCollection.cards[validRnd]}
            createRandomNumber={createRandomNumber}
            onBackToCollections={handleBackToCollections}
          />
        )}

      {(noMoreCardsForRound ||
        !selectedCollection?.id ||
        !selectedCollection?.cards?.length) &&
        collections?.length > 0 && (
          <PracticeCollections collections={collections} />
        )}

      {(!selectedCollection?.id || !selectedCollection?.cards?.length) &&
        !collections?.length && <EmptyPractice />}
    </main>
  );
}

// Reducer initial state
export const initialState = {
  usedCards: [],
  lastShownCards: [],
  sessionRound: 0,
  noMoreCardsForRound: false,
};

// Reducer function
export function practiceReducer(state, action) {
  switch (action.type) {
    case "ADD_USED_CARD":
      return {
        ...state,
        usedCards: [...state.usedCards, action.payload],
        lastShownCards: [...state.lastShownCards, action.payload].slice(-3), // Son 3 kart
        noMoreCardsForRound: false,
      };
    case "NEXT_ROUND":
      return {
        ...state,
        sessionRound: state.sessionRound + 1,
        usedCards: [],
        lastShownCards: [],
        noMoreCardsForRound: false,
      };
    case "RESET_SESSION":
      return initialState;
    case "NO_MORE_CARDS_FOR_ROUND":
      return {
        ...state,
        noMoreCardsForRound: true,
      };
    default:
      return state;
  }
}

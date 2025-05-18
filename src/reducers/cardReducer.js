export const initialState = {
  front: "",
  back: [],
};

export const cardReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRONT":
      return { ...state, front: action.payload };

    case "ADD_PARAGRAPH":
      return {
        ...state,
        back: [
          ...state.back,
          { type: "paragraph", paragraphTitle: "", paragraphContent: "" },
        ],
      };

    case "SET_PARAGRAPH_TITLE":
      return {
        ...state,
        back: {
          ...state.back,
          paragraphList: state.back.paragraphList.map((p, index) =>
            index === action.payload.index
              ? { ...p, paragraphTitle: action.payload.value }
              : p
          ),
        },
      };

    case "SET_PARAGRAPH_CONTENT":
      return {
        ...state,
        back: {
          ...state.back,
          paragraphList: state.back.paragraphList.map((p, index) =>
            index === action.payload.index
              ? { ...p, paragraphContent: action.payload.value }
              : p
          ),
        },
      };

    case "ADD_DESCRIPTION_ITEM":
      return {
        ...state,
        back: [...state.back, { type: "description", description: "" }],
      };

    case "SET_DESCRIPTION_ITEM":
      return {
        ...state,
        back: {
          ...state.back,
          descriptionList: state.back.descriptionList.map((desc, index) =>
            index === action.payload.index ? action.payload.value : desc
          ),
        },
      };

    case "ADD_LIST":
      return {
        ...state,
        back: [...state.back, { type: "list", listTitle: "", listArray: [] }],
      };

    case "ADD_ITEM_LISTARRAY":
      return {
        ...state,
        back: [
          ...state.back,
          state.back.map((item, index) =>
            index === action.payload
              ? { ...item, listArray: [...item.listArray, ""] }
              : item
          ),
        ],
      };

    case "SET_ITEM_LISTARRAY":
      return {
        ...state,
        back: {
          ...state.back,
          dotList: state.back.dotList.map((array, index) =>
            index === action.payload.listIndex
              ? {
                  ...array,
                  listArray: array.listArray.map((item, index) =>
                    index === action.payload.dotIndex
                      ? action.payload.value
                      : item
                  ),
                }
              : array
          ),
        },
      };

    case "SET_LIST_TITLE":
      return {
        ...state,
        back: {
          ...state.back,
          dotList: state.back.dotList.map((l, index) =>
            index === action.payload.index
              ? { ...l, listTitle: action.payload.value }
              : l
          ),
        },
      };

    case "RESET_STATE":
      return {
        front: "",
        back: [],
      };
  }
};

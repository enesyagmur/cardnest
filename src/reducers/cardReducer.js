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
          {
            id: Date.now(),
            type: "paragraph",
            paragraphTitle: "",
            paragraphContent: "",
          },
        ],
      };

    case "SET_PARAGRAPH_TITLE":
      return {
        ...state,
        back: state.back.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                paragraphTitle: action.payload.value,
              }
            : item
        ),
      };

    case "SET_PARAGRAPH_CONTENT":
      return {
        ...state,
        back: state.back.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                paragraphContent: action.payload.value,
              }
            : item
        ),
      };

    case "ADD_DESCRIPTION":
      return {
        ...state,
        back: [
          ...state.back,
          { id: Date.now(), type: "description", description: "" },
        ],
      };

    case "SET_DESCRIPTION":
      return {
        ...state,
        back: state.back.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                description: action.payload.value,
              }
            : item
        ),
      };

    case "ADD_LIST":
      return {
        ...state,
        back: [
          ...state.back,
          { id: Date.now(), type: "list", listTitle: "", listArray: [] },
        ],
      };

    case "ADD_ITEM_LISTARRAY":
      return {
        ...state,
        back: state.back.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                listArray: Array.isArray(item.listArray)
                  ? [...item.listArray, ""]
                  : [""],
              }
            : item
        ),
      };

    case "DELETE_LISTARRAY_ITEM":
      return {
        ...state,
        back: state.back.map((list) =>
          list.id === action.payload.listIndex
            ? {
                ...list,
                listArray: list.listArray.filter(
                  (dot, index) => index !== action.payload.dotIndex
                ),
              }
            : list
        ),
      };

    case "SET_LIST_TITLE":
      return {
        ...state,
        back: state.back.map((item) =>
          item.id === action.payload.index
            ? { ...item, listTitle: action.payload.value }
            : item
        ),
      };

    case "SET_LISTARRAY_ITEM":
      return {
        ...state,
        back: state.back.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                listArray: list.listArray.map((dot, index) =>
                  index === action.payload.dotIndex ? action.payload.value : dot
                ),
              }
            : list
        ),
      };

    case "DELETE_ITEM":
      return {
        ...state,
        back: state.back.filter((item) => item.id !== action.payload),
      };

    case "RESET_STATE":
      return {
        front: "",
        back: [],
      };

    default:
      return state;
  }
};

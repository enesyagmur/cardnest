import { v4 as uuidv4 } from "uuid";

export const initialState = {
  id: "",
  title: "",
  elements: [],
};

export const templateReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };

    case "ADD_DESCRIPTION":
      return {
        ...state,
        elements: [
          ...state.elements,
          { id: uuidv4(), type: "description", description: "" },
        ],
      };

    case "ADD_PARAGRAPH":
      return {
        ...state,
        elements: [
          ...state.elements,
          {
            id: uuidv4(),
            type: "paragraph",
            paragraphTitle: "",
            paragraphContent: "",
          },
        ],
      };

    case "ADD_LIST":
      return {
        ...state,
        elements: [
          ...state.elements,
          { id: uuidv4(), type: "list", listArray: [] },
        ],
      };

    case "ADD_LIST_ITEM":
      return {
        ...state,
        elements: [
          ...state.elements.map((element) =>
            element.id === action.payload
              ? {
                  ...element,
                  items: [...element.items, { id: uuidv4(), value: "" }],
                }
              : element
          ),
        ],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        elements: state.elements.filter(
          (element) => element.id !== action.payload
        ),
      };
    case "RESET_STATE":
      return {
        id: "",
        title: "",
        elements: [],
      };
    default:
      return state;
  }
};

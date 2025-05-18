import { useReducer } from "react";
import { initialState } from "../../reducers/cardReducer";

const CardFormItem = ({ item, index }) => {
  const [state, dispatch] = (useReducer, initialState);
  if (item.type === "paragraph") {
    return (
      <div className="space-y-4">
        <div
          className="bg-white p-4 rounded-xl border border-gray-200 space-y-3"
          key={index}
        >
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Paragraf başlığı"
            onChange={(e) =>
              dispatch({
                type: "SET_PARAGRAPH_TITLE",
                payload: { index: index, value: e.target.value },
              })
            }
          />
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            placeholder="Paragraf içeriğini yazınız..."
            onChange={(e) =>
              dispatch({
                type: "SET_PARAGRAPH_CONTENT",
                payload: { index: index, value: e.target.value },
              })
            }
          />
        </div>
      </div>
    );
  } else if (item.type === "description") {
    return (
      <div className="space-y-4">
        <div
          className="bg-white p-4 rounded-xl border border-gray-200 space-y-3"
          key={index}
        >
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            placeholder="Açıklama yazınız..."
            onChange={(e) =>
              dispatch({
                type: "SET_DESCRIPTION_ITEM",
                payload: { index: index, value: e.target.value },
              })
            }
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <div
          className="bg-white p-4 rounded-xl border border-gray-200 space-y-3"
          key={index}
        >
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Liste Başlığı Giriniz"
            onChange={(e) =>
              dispatch({
                type: "SET_LIST_TITLE",
                payload: { index: index, value: e.target.value },
              })
            }
          />
          {item.listArray.map((listDot, dotIndex) => (
            <input
              key={dotIndex}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Madde giriniz"
              onChange={(e) =>
                dispatch({
                  type: "SET_ITEM_LISTARRAY",
                  payload: {
                    listIndex: index,
                    dotIndex: dotIndex,
                    value: e.target.value,
                  },
                })
              }
            />
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "ADD_ITEM_LISTARRAY", payload: index })
              }
              className="flex items-center gap-1 text-sm px-2 py-1 text-purple-700 rounded hover:bg-purple-200 transition"
            >
              ➕ Liste Elemanı
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default CardFormItem;

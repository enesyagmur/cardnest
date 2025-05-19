import DeleteCardFormItem from "./DeleteCardFormItem";

import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";
import DeleteListItem from "./DeleteListItem";
import { FiPlus } from "react-icons/fi";

const List = ({ item, index, dispatch }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group"
      key={index}
    >
      {/* Liste Başlığı Alanı */}
      <div className="flex items-center gap-2">
        <DeleteCardFormItem index={index} dispatch={dispatch} />
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Liste Başlığı Giriniz"
          onChange={(e) =>
            dispatch({
              type: "SET_LIST_TITLE",
              payload: { index: index, value: e.target.value },
            })
          }
        />
      </div>

      {/* Liste Öğeleri */}
      {item.listArray && item.listArray.length > 0 && (
        <div className="space-y-2 pl-7">
          {item.listArray.map((listDot, dotIndex) => (
            <div key={dotIndex} className="flex items-center gap-2">
              <GoDot className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Madde giriniz"
                onChange={(e) =>
                  dispatch({
                    type: "SET_LISTARRAY_ITEM",
                    payload: {
                      listIndex: index,
                      dotIndex: dotIndex,
                      value: e.target.value,
                    },
                  })
                }
              />
              <DeleteListItem
                listIndex={index}
                dotIndex={dotIndex}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      )}

      {/* Liste Elemanı Ekle Butonu */}
      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ITEM_LISTARRAY", payload: index })}
        className="ml-7 mt-1 flex items-center justify-center gap-1 text-sm w-6 h-6 rounded-full bg-purple-100 text-purple-500 hover:bg-purple-200 transition-colors focus:outline-none"
        title="Liste elemanı ekle"
      >
        <FiPlus className="h-3 w-3" />
      </button>
    </div>
  );
};

export default List;

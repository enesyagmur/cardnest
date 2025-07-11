import DeleteCardFormItem from "./DeleteCardFormItem";
import { GoDot } from "react-icons/go";
import DeleteListItem from "./DeleteListItem";
import { FiPlus } from "react-icons/fi";
import { BiUpload } from "react-icons/bi";

const CardFormItem = ({ item, id, dispatch }) => {
  if (item.type === "paragraph") {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group">
        <div className="flex items-center gap-2">
          <DeleteCardFormItem id={id} dispatch={dispatch} />
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Paragraf başlığı"
            value={item.paragraphTitle || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_PARAGRAPH_TITLE",
                payload: { id: id, value: e.target.value },
              })
            }
          />
        </div>

        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Paragraf içeriğini yazınız..."
          value={item.paragraphContent || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_PARAGRAPH_CONTENT",
              payload: { id: id, value: e.target.value },
            })
          }
        />
      </div>
    );
  }

  if (item.type === "description") {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 relative">
        <DeleteCardFormItem id={id} dispatch={dispatch} />
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Açıklama yazınız..."
          value={item.description || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_DESCRIPTION",
              payload: { id: id, value: e.target.value },
            })
          }
        />
      </div>
    );
  }

  if (item.type === "image") {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 relative">
        <DeleteCardFormItem id={id} dispatch={dispatch} />

        {/* Gizli input */}
        <input
          type="file"
          id={`file-input-${id}`}
          accept="image/*"
          onChange={(e) =>
            dispatch({
              type: "SET_IMAGE",
              payload: { id: id, file: e.target.files[0] },
            })
          }
          className="hidden"
        />

        {/* Modern upload arayüzü */}
        <label
          htmlFor={`file-input-${id}`}
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 transition-all duration-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center justify-center group"
        >
          <BiUpload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 mb-3" />
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-1">Resim Yükle</p>
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group">
      <div className="flex items-center gap-2">
        <DeleteCardFormItem id={id} dispatch={dispatch} />
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Liste Başlığı Giriniz"
          value={item.listTitle || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_LIST_TITLE",
              payload: { id: id, value: e.target.value },
            })
          }
        />
      </div>

      {item.listArray && item.listArray.length > 0 && (
        <div className="space-y-2 pl-7">
          {item.listArray.map((listDot) => (
            <div key={listDot.id} className="flex items-center gap-2">
              <GoDot className="text-gray-400 flex-shrink-0" size={16} />
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Madde giriniz"
                value={listDot.value || ""}
                onChange={(e) =>
                  dispatch({
                    type: "SET_LISTARRAY_ITEM",
                    payload: {
                      listId: id,
                      dotId: listDot.id,
                      value: e.target.value,
                    },
                  })
                }
              />
              <DeleteListItem
                listId={id}
                dotId={listDot.id}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ITEM_LISTARRAY", payload: id })}
        className="ml-7 mt-1 flex items-center justify-center gap-1 text-sm w-6 h-6 rounded-full bg-purple-100 text-purple-500 hover:bg-purple-200 transition-colors focus:outline-none"
        title="Liste elemanı ekle"
      >
        <FiPlus className="h-3 w-3" />
      </button>
    </div>
  );
};

export default CardFormItem;

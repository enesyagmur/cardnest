import React, { useReducer } from "react";

const initialState = {
  front: "",
  back: {
    paragraphList: [],
    lists: [],
  },
};

function cardReducer(state, action) {
  switch (action.type) {
    case "ADD_PARAGRAPH":
      return {
        ...state,
        back: {
          ...state.back,
          paragraphList: [
            ...state.back.paragraphList,
            { paragraphTitle: "", paragraphContent: "" },
          ],
        },
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
    case "ADD_LIST":
      return {
        ...state,
        back: {
          ...state.back,
          lists: [...state.back.lists, { listTitle: "", listArray: [] }],
        },
      };

    case "SET_FRONT":
      return { ...state, front: action.payload };
  }
}

const CardForm = ({ collection }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  console.log(state);

  const handleSaveCard = (e) => {
    e.preventDefault();
    // const newCards = collection.cards;
    // newCards.push({ id: Date.now(), ...state });

    // const data = localStorage.getItem("collectionList");
    // const collections = JSON.parse(data);

    // const updatedCollections = collections.map((item) => {
    //   if (item.id === collection.id) {
    //     return { ...item, cards: [...newCards] };
    //   }
    //   return item;
    // });

    // localStorage.setItem("collectionList", JSON.stringify(updatedCollections));
    // state({ front: "", back: "" });
  };

  return (
    <form
      className="w-full  bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-6"
      onSubmit={handleSaveCard}
    >
      <h2 className="text-2xl font-bold text-blue-700">Yeni Kart Oluştur</h2>

      {/* Başlık */}
      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Başlık:</span>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Kart başlığını ya da sorusu giriniz"
          required
          onChange={(e) =>
            dispatch({ type: "SET_FRONT", payload: e.target.value })
          }
        />
      </label>

      {/* Paragraf Ekle Bölümü */}
      <div className="space-y-4">
        {state.back.paragraphList.map((item, index) => (
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
        ))}

        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_PARAGRAPH" })}
            className="flex items-center gap-1 text-sm  text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
          >
            📝 Paragraf Ekle
          </button>
        </div>
      </div>

      {/* Liste Ekle Bölümü */}
      <div className="space-y-4">
        {state.back.lists.map((item, index) => (
          <div
            className="bg-white p-4 rounded-xl border border-gray-200 space-y-3"
            key={index}
          >
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Liste başlığı"
            />

            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="1. Liste elemanı"
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="flex items-center gap-1 text-sm px-2 py-1 text-purple-700 rounded hover:bg-purple-200 transition"
              >
                ➕ Liste Elemanı
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_LIST" })}
            className="flex items-center gap-1 text-sm  text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
          >
            📋 Liste Ekle
          </button>
        </div>
      </div>

      {/* Oluştur Butonu */}
      <button
        type="submit"
        className="w-full bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-semibold py-2.5 rounded-md transition"
      >
        Oluştur
      </button>
    </form>
  );
};

export default CardForm;

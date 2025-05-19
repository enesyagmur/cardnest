import React, { useReducer } from "react";
import { cardReducer, initialState } from "../../../reducers/cardReducer";
import CardFormItem from "./CardFormItem";
import { AiOutlineClose } from "react-icons/ai";

const CardForm = ({ collection, setShowCardForm }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  const handleSaveCard = (e) => {
    e.preventDefault();
    const newCards = collection.cards;
    newCards.push({ id: Date.now(), ...state });

    const data = localStorage.getItem("collectionList");
    const collections = JSON.parse(data);

    const updatedCollections = collections.map((item) => {
      if (item.id === collection.id) {
        return { ...item, cards: [...newCards] };
      }
      return item;
    });

    localStorage.setItem("collectionList", JSON.stringify(updatedCollections));
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <form
      className="w-full  bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-6"
      onSubmit={handleSaveCard}
    >
      <div className="relative">
        <h2 className="text-2xl font-bold text-blue-700">Yeni Kart Oluştur</h2>
        <button
          type="button"
          className="absolute top-0 right-0 mt-1 mr-1 text-gray-400 hover:text-red-500 text-xl"
          aria-label="Formu kapat"
          onClick={() => setShowCardForm(false)}
        >
          <AiOutlineClose />
        </button>
      </div>

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
          value={state.front}
        />
      </label>
      {state.back.length
        ? state.back.map((item, index) => (
            <CardFormItem
              item={item}
              index={index}
              key={index}
              dispatch={dispatch}
            />
          ))
        : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_PARAGRAPH" })}
          className="flex items-center gap-1 text-sm text-blue-700 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
        >
          📝 Paragraf Ekle
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_LIST" })}
          className="flex items-center gap-1 text-sm text-blue-700 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
        >
          📋 Liste Ekle
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_DESCRIPTION" })}
          className="flex items-center gap-1 text-sm text-blue-700 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
        >
          📄 Kısa Açıklama Ekle
        </button>
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

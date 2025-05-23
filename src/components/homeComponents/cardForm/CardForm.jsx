import { useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import NotifyCustom from "../../../utils/NotifyCustom";
import { addnewCard } from "../../../features/collections/collectionsThunks";
import { cardReducer, initialState } from "../../../reducers/cardReducer";
import CardFormItem from "./CardFormItem";

const CardForm = ({ collection, setShowCardForm }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const user = useSelector((state) => state.auth.user);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduxDispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const newErrors = {};

    if (!state.front.trim()) {
      newErrors.front = "Başlık boş olamaz.";
    }

    const hasValidBackItem = state.back.some((item) => {
      if (item.type === "paragraph") {
        return item.paragraphTitle.trim() || item.paragraphContent.trim();
      } else if (item.type === "list") {
        return item.listTitle.trim() || item.listItems.some((li) => li.trim());
      } else if (item.type === "description") {
        return item.description.trim();
      }
      return false;
    });

    if (!hasValidBackItem) {
      newErrors.back = "En az bir içerik girilmelidir.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const newCardData = {
        front: state.front,
        back: state.back,
      };

      await reduxDispatch(
        addnewCard({ userId: user.uid, colId: collection.id, newCardData })
      );

      NotifyCustom("success", "Kart başarıyla eklendi.");
      setShowCardForm(false);
    } catch (error) {
      NotifyCustom("error", `Kart eklenirken hata: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gradient-to-bl from-white to-blue-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-6"
    >
      <div className="relative">
        <h2 className="text-lg sm:text-2xl font-bold text-blue-700">
          Yeni Kart Oluştur
        </h2>
        <button
          type="button"
          className="absolute top-0 right-0 mt-1 mr-1 text-gray-400 hover:text-red-500 text-xl"
          aria-label="Formu kapat"
          onClick={() => setShowCardForm(false)}
        >
          <AiOutlineClose />
        </button>
      </div>

      <label className="block">
        <span className="text-gray-700 font-semibold mb-1 block">Başlık:</span>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Kart başlığını ya da sorusu giriniz"
          onChange={(e) =>
            dispatch({ type: "SET_FRONT", payload: e.target.value })
          }
          value={state.front}
        />
        {errors.front && (
          <p className="text-sm text-red-600 mt-1">{errors.front}</p>
        )}
      </label>

      {errors.back && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-2 rounded-md">
          {errors.back}
        </div>
      )}

      {state.back.length > 0 &&
        state.back.map((item) => (
          <div key={item.id} className="space-y-1">
            <CardFormItem item={item} id={item.id} dispatch={dispatch} />
          </div>
        ))}

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-semibold py-2.5 rounded-md transition"
      >
        {isSubmitting ? "Oluşturuluyor..." : "Oluştur"}
      </button>
    </form>
  );
};

export default CardForm;

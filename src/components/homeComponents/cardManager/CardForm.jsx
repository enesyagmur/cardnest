import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotifyCustom from "../../../utils/NotifyCustom";
import { setCollectionId } from "../../../features/collections/collectionsSlice";
import {
  addnewCard,
  cardUpdate,
} from "../../../features/collections/collectionsThunks";
import { cardReducer, initialState } from "../../../reducers/cardReducer";
import CardFormItem from "./CardFormItem";

const CardForm = ({ collection, formMode, setFormMode }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const user = useSelector((state) => state.auth.user);
  const card = useSelector((state) => state.selectCard.card);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (formMode === "update" && card) {
      dispatch({ type: "CARD_CLONE", payload: card });
    }
  }, [card]);

  useEffect(() => {
    if (formMode === "create") {
      dispatch({ type: "RESET_STATE" });
    }
  }, [formMode]);

  const HandleAddCard = async () => {
    try {
      const newCardData = {
        front: state.front,
        back: state.back,
      };

      await reduxDispatch(
        addnewCard({ userId: user.uid, colId: collection.id, newCardData })
      ).unwrap();

      NotifyCustom("success", "Kart başarıyla eklendi.");
      dispatch({ type: "RESET_STATE" });

      setFormMode("create");

      setCollectionId(collection.id);
    } catch (err) {
      NotifyCustom("error", `CardForm | Kart oluşturulurken hata: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const HandleUpdateCard = async () => {
    try {
      const values = {
        front: state.front,
        back: state.back,
        createdAt: state.createdAt,
        difficulty: state.difficulty,
        id: state.id,
        isArchived: state.isArchived,
        stats: state.stats,
      };

      await reduxDispatch(
        cardUpdate({
          userId: user.uid,
          colId: collection.id,
          cardId: card.id,
          values,
        })
      ).unwrap();

      NotifyCustom("success", "Kart başarıyla güncellendi.");
    } catch (error) {
      NotifyCustom(
        "error",
        `Kart güncellenirken hata:`,
        error?.message || "Bilinmeyen hata"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
        return (
          item.listTitle.trim() || item.listArray.some((li) => li.value.trim())
        );
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

    if (formMode === "create") {
      HandleAddCard();
    } else if (formMode === "update") {
      HandleUpdateCard();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full sm:w-7/12 min-h-[580px] overflow-y-auto border rounded-lg p-6 shadow-md  transition-all duration-300 space-y-6 
      bg-gray-50`}
    >
      <div className="relative">
        <h2
          className={`text-lg sm:text-2xl font-bold 
          ${formMode === "create" ? "text-green-400" : "text-blue-400"}`}
        >
          {formMode === "create" ? "Yeni Kart Oluştur" : "Kartı Güncelle"}
        </h2>
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
        className={`w-full text-center px-4 py-3 font-semibold rounded-md border transition duration-300  text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-white`}
      >
        {isSubmitting
          ? formMode === "create"
            ? "Oluşturuluyor..."
            : "Güncelleniyor..."
          : formMode === "create"
          ? "Oluştur"
          : "Güncelle"}
      </button>
    </form>
  );
};

export default CardForm;

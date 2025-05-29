import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addnewCard,
  cardUpdate,
} from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import { setCollectionId } from "../../features/collections/collectionsSlice";
import { cardReducer, initialState } from "../../reducers/cardReducer";
import CardFormItem from "../cardsComponent/CardFormItem";
import TemplateList from "./TemplateList";

const CardForm = ({ collection, formMode, setFormMode }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const user = useSelector((state) => state.auth.user);
  const card = useSelector((state) => state.selectCard.card);
  const selectedTemplate = useSelector(
    (state) => state.templates.selectedTemplate
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (formMode === "update" && card) {
      dispatch({ type: "CARD_CLONE", payload: card });
    }
  }, [card, dispatch, formMode]);

  useEffect(() => {
    if (formMode === "create") {
      dispatch({ type: "RESET_STATE" });
    }
  }, [formMode]);

  useEffect(() => {
    if (selectedTemplate !== null && selectedTemplate.length > 0) {
      dispatch({ type: "TAKE_TEMPLATE", payload: selectedTemplate });
    } else {
      dispatch({ type: "RESET_STATE" });
    }
  }, [selectedTemplate]);

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
      className="w-full md:w-7/12 h-full bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-4 shadow-xl  overflow-y-auto transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between space-x-3 pb-4 border-b border-gray-100">
        <div
          className={`flex items-center justify-start w-64 h-10 rounded-xl `}
        >
          <span
            className={` w-10 h-10 rounded-xl flex items-center justify-center ${
              formMode === "create"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
          >
            {formMode === "create" ? "✨" : "🔄"}
          </span>

          <h2
            className={`text-xl font-bold ml-2 ${
              formMode === "create" ? "text-emerald-600" : "text-blue-600"
            }`}
          >
            {formMode === "create" ? "Yeni Kart Oluştur" : "Kartı Güncelle"}
          </h2>
        </div>
        {formMode === "create" && <TemplateList />}
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Başlık:
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          placeholder="Kart başlığını ya da sorusu giriniz"
          onChange={(e) =>
            dispatch({ type: "SET_FRONT", payload: e.target.value })
          }
          value={state.front}
        />
        {errors.front && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            <span className="text-red-400">⚠</span>
            {errors.front}
          </p>
        )}
      </div>

      {/* Back Error */}
      {errors.back && (
        <div className="bg-red-50/80 border border-red-200 text-red-700 text-sm p-3 rounded-xl flex items-center gap-2">
          <span className="text-red-400">⚠</span>
          {errors.back}
        </div>
      )}

      {/* Dynamic Content */}
      <div className="space-y-4">
        {state.back.length > 0 &&
          state.back.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <CardFormItem item={item} id={item.id} dispatch={dispatch} />
            </div>
          ))}
      </div>

      {/* Action Buttons */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-600 mb-3 font-medium">İçerik Ekle:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_PARAGRAPH" })}
            className="flex items-center gap-2 text-sm bg-white text-blue-700 px-4 py-2.5 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow"
          >
            <span className="text-base">📝</span>
            Paragraf Ekle
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_LIST" })}
            className="flex items-center gap-2 text-sm bg-white text-blue-700 px-4 py-2.5 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow"
          >
            <span className="text-base">📋</span>
            Liste Ekle
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_DESCRIPTION" })}
            className="flex items-center gap-2 text-sm bg-white text-blue-700 px-4 py-2.5 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow"
          >
            <span className="text-base">📄</span>
            Kısa Açıklama Ekle
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-3  bg-white border border-pink-500 text-pink-400 hover:bg-pink-600 hover:text-white  font-semibold rounded-xl transition  shadow-lg "
        >
          {isSubmitting
            ? formMode === "create"
              ? "Oluşturuluyor..."
              : "Güncelleniyor..."
            : formMode === "create"
            ? "Oluştur"
            : "Güncelle"}
        </button>
      </div>
    </form>
  );
};

export default CardForm;

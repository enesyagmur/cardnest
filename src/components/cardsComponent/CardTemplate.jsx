import React, { useReducer } from "react";
import { initialState, templateReducer } from "../../reducers/templateReducer";
import CardTemplateItem from "./CardTemplateItem";
import NotifyCustom from "../../utils/NotifyCustom";
import { addTemplateThunk } from "../../features/templates/templatesThunks";
import { useDispatch, useSelector } from "react-redux";

const CardTemplate = () => {
  const [state, dispatch] = useReducer(templateReducer, initialState);
  const user = useSelector((state) => state.auth.user);
  const reduxDispatch = useDispatch();

  const handleAddTemplate = async (e) => {
    e.preventDefault();
    try {
      const _newTemplate = await reduxDispatch(
        addTemplateThunk({ userId: user.uid, template: state })
      ).unwrap();
      NotifyCustom("success", "Şablon oluşturuldu");
      dispatch({ type: "RESET_STATE" });
    } catch (err) {
      NotifyCustom(
        "error",
        `CardTemplate | Şablon oluşturulurken sorun: ${
          err || "bilinmeyen hata"
        }`
      );
    }
  };

  return (
    <form
      onSubmit={handleAddTemplate}
      className="w-full md:w-7/12 h-[590px] bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg p-4 shadow-xl  overflow-y-auto transition-all duration-300"
    >
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 `}
        >
          ✨
        </div>
        <h2 className={`text-xl font-bold text-violet-600 `}>
          Hazır Kart Şablonu Oluştur
        </h2>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Başlık:{" "}
          <p className="text-gray-500 text-[12px]">
            Şablon isimlerini hatırlamanız için dilerseniz başlığı eklediğiniz
            elemanların baş harfi ile kodlayabilirsiniz.
          </p>
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 capitalize bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          placeholder="PLA, yani bu şablon sırasıyla Paragraf, Liste, Açıklama barındırıyor"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
        />
      </div>

      {/* Dynamic Content */}
      <div className="space-y-4">
        {state.elements.length > 0 &&
          state.elements.map((item) => (
            <div
              key={item.id}
              className="bg-white/70 border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <CardTemplateItem item={item} id={item.id} dispatch={dispatch} />
            </div>
          ))}
      </div>

      {/* Action Buttons */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 rounded-xl p-4 mt-2">
        <p className="text-sm text-gray-600 mb-3 font-medium">Bölüm Ekle:</p>
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
          className="w-full px-4 py-3  bg-white border border-pink-500 text-pink-400 hover:bg-pink-600 hover:text-white  font-semibold rounded-xl transition  shadow-lg "
        >
          Oluştur
        </button>
      </div>
    </form>
  );
};

export default CardTemplate;

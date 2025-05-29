import { useDispatch, useSelector } from "react-redux";
import { cardDelete } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import { setCard } from "../../features/selectCardSlice";
import { MdViewList } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";

const CardList = ({ setFormMode, collection }) => {
  const user = useSelector((state) => state.auth.user);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteCard = async (cardId) => {
    try {
      const result = await dispatch(
        cardDelete({
          userId: user.uid,
          colId: collection.id,
          cardId: cardId,
        })
      ).unwrap();
      NotifyCustom("success", "Kart silindi");
      return result;
    } catch (err) {
      NotifyCustom("error", `CardList | Kart silinirken hata: ${err}`);
      console.error(err);
    }
  };

  const handleSelectCardForUpdate = (card) => {
    dispatch(setCard(card));
    setFormMode("update");
  };

  if (Array.isArray(collection.cards) && collection.cards.length > 0) {
    return (
      <div className="space-y-4 max-h-[473px] overflow-y-auto">
        {collection.cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-full border rounded-xl p-5 transition-shadow duration-300 flex flex-col 
           ${
             openDropdownId === card.id
               ? "border-2 border-purple-300 shadow-md"
               : "bg-white border-gray-300 shadow-sm hover:shadow-lg"
           }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-semibold text-gray-700 capitalize break-words">
                {card.front}
              </h3>

              <button
                onClick={() => setOpenDropdownId(card.id)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FiMoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center bg-gray-50 text-gray-500 text-xs rounded-lg px-3 py-1 w-max select-none mb-2">
              <MdViewList size={16} className="mr-1" />
              {card.back.length} Bölüm
            </div>

            {openDropdownId === card.id && (
              <div className="flex gap-3 text-xs font-semibold mt-2 transition-all ">
                <button
                  className="px-4 py-2 border text-blue-600 rounded-md bg-blue-100 hover:bg-blue-300 transition"
                  onClick={() => {
                    handleSelectCardForUpdate(card);
                  }}
                >
                  Güncelle
                </button>
                <button
                  className="px-4 py-2 border text-red-600 rounded-md bg-red-100 hover:bg-red-300 transition"
                  onClick={() => {
                    handleDeleteCard(card.id);
                  }}
                >
                  Sil
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default CardList;

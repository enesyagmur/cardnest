import { useDispatch, useSelector } from "react-redux";
import { deleteCollection } from "../../../features/collections/collectionsThunks";
import { setCollection } from "../../../features/selectCollectionSlice";
import { setComponent } from "../../../features/selectComponentSlice";
import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Modal from "../../Modal";
import NotifyCustom from "../../../utils/NotifyCustom";

export default function CollectionList({ setFormMode, collections }) {
  const { user } = useSelector((state) => state.auth);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [answer, setAnswer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (answer === true && modalOpen === false && openDropdownId) {
      try {
        const userId = user.uid;
        const idies = { userId, colId: openDropdownId };
        dispatch(deleteCollection(idies)).unwrap();
        NotifyCustom("success", "Koleksiyon Silindi");
      } catch (err) {
        NotifyCustom(
          "error",
          "Koleksiyon silinemedi: ",
          err || "Bilinmeyen Hata"
        );
      } finally {
        setAnswer(false);
      }
    }
  }, [answer, modalOpen]);

  const handleMoveToPractice = (col) => {
    dispatch(setCollection(col));
  };

  const handleSelectCollectionForUpdate = (col) => {
    dispatch(setCollection(col));
    setFormMode("update");
  };

  const handleMoveCardManager = (col) => {
    dispatch(setCollection(col));
    dispatch(setComponent("cardManager"));
  };

  if (Array.isArray(collections) && collections.length > 0) {
    return (
      <div className=" space-y-4">
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            question={"Koleksiyonu silmek istediğinize emin misiniz"}
            setAnswer={setAnswer}
          />
        )}

        {collections.map((col) => (
          <div
            key={col.id}
            className={`relative w-full border rounded-xl p-4 transition duration-200 flex flex-col
            ${
              openDropdownId === col.id
                ? "border-2 border-purple-300 shadow-md"
                : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base font-semibold text-gray-800 capitalize">
                  {col.title}
                </h3>
                <span className="text-xs text-gray-400">Koleksiyon</span>
              </div>

              <button
                onClick={() =>
                  setOpenDropdownId(openDropdownId === col.id ? null : col.id)
                }
                className="text-gray-500 hover:text-gray-700 p-1 "
              >
                <FiMoreVertical size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {col.description}
            </p>

            {openDropdownId === col.id && (
              <div className="flex gap-3 text-xs font-semibold flex-wrap mt-2 transition-all">
                {col.cards?.length > 0 && (
                  <button
                    className="px-3 py-1 border text-purple-700 bg-purple-100 hover:bg-purple-200 rounded"
                    onClick={() => handleMoveToPractice(col)}
                  >
                    Pratik Yap
                  </button>
                )}
                <button
                  className="px-3 py-1 border text-blue-700 bg-blue-100 hover:bg-blue-200 rounded"
                  onClick={() => handleSelectCollectionForUpdate(col)}
                >
                  Güncelle
                </button>
                <button
                  className="px-3 py-1 border text-red-700 bg-red-100 hover:bg-red-200 rounded"
                  onClick={() => setModalOpen(true)}
                >
                  Sil
                </button>
                <button
                  className="px-3 py-1 border text-green-700 bg-green-100 hover:bg-green-200 rounded"
                  onClick={() => handleMoveCardManager(col)}
                >
                  Kartlar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

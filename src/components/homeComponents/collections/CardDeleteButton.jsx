import { FiXCircle } from "react-icons/fi";
import { cardDelete } from "../../../features/collections/collectionsThunks";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../../../utils/NotifyCustom";

const CardDeleteButton = ({ selectedCollectionId, cardId }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleDeleteCard = async () => {
    try {
      const result = await dispatch(
        cardDelete({
          userId: user.uid,
          colId: selectedCollectionId,
          cardId: cardId,
        })
      ).unwrap();
      NotifyCustom("success", "Kart silindi");
      return result;
    } catch (err) {
      NotifyCustom("error", `Kart silme başarısız: ${err}`);
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleDeleteCard}
      className="flex items-center gap-2 text-sm px-4 py-1.5 bg-red-200 hover:bg-red-300 text-red-800 rounded-md transition-colors"
    >
      <FiXCircle className="text-base" />
      Kaldır
    </button>
  );
};

export default CardDeleteButton;

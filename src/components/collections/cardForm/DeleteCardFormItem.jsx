import { CiSquareRemove } from "react-icons/ci";
import { FiX } from "react-icons/fi";

const DeleteCardFormItem = ({ id, dispatch }) => {
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "DELETE_ITEM", payload: id })}
      className="text-gray-400 hover:text-red-500 transition-colors p-1 -ml-1"
      title="Listeyi kaldır"
    >
      <FiX className="h-5 w-5" />
    </button>
  );
};

export default DeleteCardFormItem;

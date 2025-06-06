import React from "react";
import { FiX } from "react-icons/fi";

const DeleteListItem = ({ listId, dotId, dispatch }) => {
  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: "DELETE_LISTARRAY_ITEM",
          payload: { listId: listId, dotId: dotId },
        })
      }
      className="text-gray-400 hover:text-red-500 transition-colors p-1"
      title="Maddeyi kaldır"
    >
      <FiX className="h-4 w-4" />
    </button>
  );
};

export default DeleteListItem;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../features/auth/authThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import { FiLogOut } from "react-icons/fi";
import { setCard } from "../../features/selectCardSlice";
import {
  setCollectionId,
  clearCollections,
} from "../../features/collections/collectionsSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const resultAction = await dispatch(logoutThunk());
      if (logoutThunk.fulfilled.match(resultAction)) {
        dispatch(setCollectionId(""));
        dispatch(setCard({}));
        dispatch(clearCollections());

        navigate("/");
      } else {
        NotifyCustom("error", "Header | Çıkış işlemi başarısız");
      }
    } catch (err) {
      NotifyCustom("error", "Dispatch logoutThunk başarısız ", err.message);
    }
  };

  return (
    <button
      onClick={() => {
        onLogout();
      }}
      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 bg-white hover:bg-red-50 hover:shadow-md shadow-sm rounded-md focus:outline-none text-sm transition duration-150"
      role="menuitem"
      type="button"
    >
      <FiLogOut className="text-base" />
      <span>Çıkış Yap</span>
    </button>
  );
};

export default LogoutButton;

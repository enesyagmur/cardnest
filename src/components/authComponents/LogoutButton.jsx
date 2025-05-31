import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../features/auth/authThunks";
import NotifyCustom from "../../utils/NotifyCustom";

import { setCard } from "../../features/selectCardSlice";
import {
  setCollectionId,
  clearCollections,
} from "../../features/collections/collectionsSlice";
import { clearTemplates } from "../../features/templates/templatesSlice";
import { BiLogOut } from "react-icons/bi";

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
        dispatch(clearTemplates());

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
      className=" flex items-center justify-center px-4 py-2 text-red-400 text-xl hover:text-red-600 shadow-sm   hover:shadow-md rounded-md focus:outline-none transition duration-150"
      type="button"
    >
      <BiLogOut />
    </button>
  );
};

export default LogoutButton;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../features/auth/authThunks";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const resultAction = await dispatch(logoutThunk());
      if (logoutThunk.fulfilled.match(resultAction)) {
        console.log("Header | Çıkış işlemi başarılı");

        navigate("/");
      } else {
        console.error("Header | Çıkış işlemi başarısız:", resultAction.payload);
      }
    } catch (err) {
      console.error("Header | dispatch logoutThunk başarısız:", err.message);
    }
  };

  return (
    <button
      onClick={() => {
        onLogout();
      }}
      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-sm"
      role="menuitem"
      type="button"
    >
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;

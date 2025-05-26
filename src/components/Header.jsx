import React, { useState } from "react";
import {
  AiFillEdit,
  AiOutlineUnorderedList,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { FaLayerGroup, FaUserCircle } from "react-icons/fa";
import LogoutButton from "./authComponents/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import NotifyCustom from "../utils/NotifyCustom";
import { setComponent } from "../features/selectComponentSlice";

export default function Header() {
  const { displayName } = useSelector((state) => state.auth.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { component } = useSelector((state) => state.selectComponent.component);

  const buttonStyles = {
    collectionManager:
      "text-blue-600 hover:bg-blue-100 focus:ring-blue-300 focus:ring",
    cardManager:
      "text-green-600 hover:bg-green-100 focus:ring-green-300 focus:ring",
  };

  const activeButtonStyles = {
    collectionManager: "bg-blue-100 text-blue-800",
    cardManager: "bg-green-100 text-green-800",
  };

  const dispatch = useDispatch();

  return (
    <header className="w-full md:w-11/12 rounded-b-xl  bg-gray-50 shadow-sm py-2 md:py-3 mx-auto flex items-center justify-between px-3 sm:px-5">
      <div className="flex items-center gap-1 sm:gap-2 cursor-pointer select-none">
        <FaLayerGroup className="text-xl sm:text-2xl text-purple-500" />
        <span className="font-semibold text-base sm:text-lg md:text-xl text-gray-700 tracking-wide">
          CARDNEST
        </span>
      </div>

      <nav className="flex justify-center flex-wrap gap-2 sm:gap-3 px-2 sm:px-4 flex-1 max-w-lg">
        <button
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
            component === "collectionManager"
              ? activeButtonStyles.collectionManager
              : buttonStyles.collectionManager
          }`}
          onClick={() => dispatch(setComponent("collectionManager"))}
          aria-label="Koleksiyonlar Sayfasına Git"
          type="button"
        >
          <AiFillEdit className="text-sm sm:text-base" />
          <span className="hidden md:inline">Koleksiyonlar</span>
        </button>

        <button
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
            component === "cardManager"
              ? activeButtonStyles.cardManager
              : buttonStyles.cardManager
          }`}
          onClick={() => dispatch(setComponent("cardManager"))}
          aria-label="Cardlar Sayfasına Git"
          type="button"
        >
          <AiOutlineUnorderedList className="text-sm sm:text-base" />
          <span className="hidden md:inline">Kartlar</span>
        </button>
      </nav>

      <div className="relative">
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-1 sm:gap-1.5 bg-white border border-gray-300 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          type="button"
          aria-haspopup="true"
          aria-expanded={userMenuOpen}
          aria-label="Kullanıcı menüsü"
        >
          <FaUserCircle className="text-base sm:text-lg text-purple-400" />
          <span className="hidden sm:inline text-xs sm:text-sm font-medium capitalize">
            {displayName || "Kullanıcı"}
          </span>
        </button>

        {userMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}

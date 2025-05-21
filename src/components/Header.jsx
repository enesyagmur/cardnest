import React, { useState } from "react";
import {
  AiFillEdit,
  AiOutlineUnorderedList,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { FaLayerGroup, FaUserCircle } from "react-icons/fa";
import { logout } from "../services/firebaseAuthService";
import { useNavigate } from "react-router-dom";

export default function Header({ page, setPage, userName }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      console.log("Header | Çıkış işlemi başarılı");
      navigate("/");
    } catch (err) {
      console.error("Header | Çıkış işlemi başarısız: ", err.message, err.code);
      throw err;
    }
  };

  const buttonStyles = {
    collectionForm:
      "text-blue-600 hover:bg-blue-100 focus:ring-blue-300 focus:ring",
    collectionList:
      "text-green-600 hover:bg-green-100 focus:ring-green-300 focus:ring",
    practice: "text-pink-600 hover:bg-pink-100 focus:ring-pink-300 focus:ring",
  };

  const activeButtonStyles = {
    collectionForm: "bg-blue-100 text-blue-800",
    collectionList: "bg-green-100 text-green-800",
    practice: "bg-pink-100 text-pink-800",
  };

  return (
    <header className="w-full md:w-11/12 rounded-b-xl bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 shadow-sm py-3 mx-auto flex items-center justify-between px-5">
      {/* Sol: Logo ve Proje İsmi */}
      <div className="flex items-center gap-2 cursor-pointer select-none">
        <FaLayerGroup className="text-2xl text-purple-500" />
        <span className="font-semibold text-xl text-gray-700 tracking-wide">
          CARDNEST
        </span>
      </div>

      {/* Orta: Sayfa Geçiş Butonları */}
      <nav className="flex justify-center flex-wrap gap-3 px-4 flex-1 max-w-lg">
        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
            page === "collectionForm"
              ? activeButtonStyles.collectionForm
              : buttonStyles.collectionForm
          }`}
          onClick={() => setPage("collectionForm")}
          aria-label="Koleksiyon Oluştur Sayfasına Git"
          type="button"
        >
          <AiFillEdit className="text-base" />
          <span className="hidden sm:inline">Koleksiyon Oluştur</span>
        </button>

        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
            page === "collectionList"
              ? activeButtonStyles.collectionList
              : buttonStyles.collectionList
          }`}
          onClick={() => setPage("collectionList")}
          aria-label="Koleksiyonlar Sayfasına Git"
          type="button"
        >
          <AiOutlineUnorderedList className="text-base" />
          <span className="hidden sm:inline">Koleksiyonlar</span>
        </button>

        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
            page === "practice"
              ? activeButtonStyles.practice
              : buttonStyles.practice
          }`}
          onClick={() => setPage("practice")}
          aria-label="Pratik Yap Sayfasına Git"
          type="button"
        >
          <AiOutlinePlayCircle className="text-base" />
          <span className="hidden sm:inline">Pratik Yap</span>
        </button>
      </nav>

      {/* Sağ: Kullanıcı Alanı */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-full px-3 py-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          type="button"
          aria-haspopup="true"
          aria-expanded={userMenuOpen}
          aria-label="Kullanıcı menüsü"
        >
          <FaUserCircle className="text-lg text-gray-600" />
          <span className="hidden sm:inline text-sm font-medium">
            {userName || "Kullanıcı"}
          </span>
        </button>

        {userMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <button
              onClick={() => {
                setUserMenuOpen(false);
                onLogout();
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none text-sm"
              role="menuitem"
              type="button"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

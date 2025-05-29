import React, { useState } from "react";
import { HiOutlineGlobeAlt, HiOutlineCollection } from "react-icons/hi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import LogoutButton from "./authComponents/LogoutButton";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LogoCustomIcon from "./logoCustomIcon";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  const { displayName } = useSelector((state) => state.auth.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      key: "collections",
      label: "Koleksiyonlar",
      icon: HiOutlineCollection,
      color: "blue",
      path: "/collections",
    },
    {
      key: "cards",
      label: "Kartlar",
      icon: AiOutlineUnorderedList,
      color: "green",
      path: "/cards",
    },
    {
      key: "practice",
      label: "Pratik",
      icon: MdOutlineQuiz,
      color: "pink",
      path: "/practice",
    },
    {
      key: "explore",
      label: "Keşfet",
      icon: HiOutlineGlobeAlt,
      color: "purple",
      path: "/explore",
    },
  ];

  const getButtonStyles = (item, isActive) => {
    const baseStyles =
      "group relative flex flex-1 items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 focus:outline-none overflow-hidden";

    const colorStyles = {
      blue: isActive
        ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
        : "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
      green: isActive
        ? "bg-green-500 text-white shadow-lg shadow-green-200"
        : "text-green-600 hover:bg-green-50 hover:text-green-700",
      pink: isActive
        ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
        : "text-pink-600 hover:bg-pink-50 hover:text-pink-700",
      purple: isActive
        ? "bg-purple-500 text-white shadow-lg shadow-purple-200"
        : "text-purple-600 hover:bg-purple-50 hover:text-purple-700",
    };

    return `${baseStyles} ${colorStyles[item.color]}`;
  };

  return (
    <header className="w-full md:w-11/12 mx-auto bg-white/90 backdrop-blur-md  border border-white/20 shadow-xl rounded-2xl p-2">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <LogoCustomIcon />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-800 tracking-tight">
              CARDNEST
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Öğrenme Platformu
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-gray-50/50 rounded-2xl p-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                className={getButtonStyles(item, isActive)}
                onClick={() => navigate(item.path)}
                aria-label={`${item.label} Sayfasına Git`}
                type="button"
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : `text-${item.color}-500`
                  } transition-transform duration-300 group-hover:scale-110`}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-1 bg-gray-50/50 rounded-xl p-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                className={`relative p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? `bg-${item.color}-500 text-white shadow-md`
                    : `text-${item.color}-600 hover:bg-${item.color}-50`
                }`}
                onClick={() => navigate(item.path)}
                aria-label={`${item.label} Sayfasına Git`}
                type="button"
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200 shadow-sm"
            type="button"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
            aria-label="Kullanıcı menüsü"
          >
            <div className="relative">
              <FaUserCircle className="w-6 h-6 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* İçerik kısmı toggle edilecek */}
            {userMenuOpen ? (
              <LogoutButton />
            ) : (
              <div className="w-24 hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {displayName || "Kullanıcı"}
                </span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            )}

            <BiLogOut className={`w-4 h-4 text-gray-400 hover:text-red-500`} />
          </button>
        </div>
      </div>
    </header>
  );
}

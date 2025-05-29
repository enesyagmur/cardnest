import React from "react";
import CardList from "./CardList";
import EmptyList from "../EmptyList";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CardPanel = ({ formMode, setFormMode, collection }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-5/12 h-full bg-white border rounded-lg shadow-sm p-2">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border border-gray-100 shadow-sm rounded-xl mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg shadow-sm">
            <span className="text-white text-base">📘</span>
          </div>
          <h1 className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {collection?.title}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 hover:from-pink-200 hover:to-pink-300 shadow-sm"
            title="Pratik Yap"
            onClick={() => navigate("/practice")}
          >
            <span>🧠</span>
            Pratik Yap
          </button>

          <button
            onClick={() => setFormMode("create")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition shadow-sm ${
              formMode !== "create"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Yeni Koleksiyon Ekle"
            title="Yeni Koleksiyon Ekle"
            disabled={formMode === "create"}
          >
            <FiPlus size={16} />
            Kart
          </button>

          <button
            onClick={() => setFormMode("template")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition shadow-sm ${
              formMode !== "template"
                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Yeni Koleksiyon Ekle"
            title="Yeni Koleksiyon Ekle"
            disabled={formMode === "template"}
          >
            <FiPlus size={16} />
            Şablon
          </button>
        </div>
      </div>

      {/* Content */}
      {collection?.cards.length > 0 ? (
        <CardList setFormMode={setFormMode} collection={collection} />
      ) : (
        <EmptyList
          title={"Henüz Kart Bulunmuyor"}
          content={
            "Koleksiyonunuz ile pratik yapmak için hemen kartlarınızı oluşturmaya başlayın."
          }
        />
      )}
    </div>
  );
};

export default CardPanel;

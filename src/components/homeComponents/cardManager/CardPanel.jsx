import React from "react";
import CardList from "./CardList";
import EmptyList from "../EmptList";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CardPanel = ({ formMode, setFormMode, collection }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-5/12 bg-white border rounded-lg shadow-sm p-4 space-y-6">
      <div className="flex items-center justify-between px-3 py-2 border border-gray-200 shadow-sm rounded-lg">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-wide text-blue-400">
            {collection?.title}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition bg-purple-100 text-purple-700 hover:bg-purple-300"
            title="Pratik Yap"
            onClick={() => navigate("/practice")}
          >
            Pratik Yap
          </button>

          <button
            onClick={() => setFormMode("create")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              formMode === "update"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 cursor-not-allowed"
            }`}
            aria-label="Yeni Koleksiyon Ekle"
            title="Yeni Koleksiyon Ekle"
            disabled={formMode !== "update"}
          >
            <FiPlus size={18} />
            Yeni Kart
          </button>
        </div>
      </div>
      {collection?.cards.length > 0 ? (
        <CardList setFormMode={setFormMode} collection={collection} />
      ) : (
        <EmptyList
          title={"Henüz Kart Bulunluyor"}
          content={
            "Koleksiyonunuz ile pratik yapmak için hemen kartlarınızı oluşturmaya başlayın."
          }
        />
      )}
    </div>
  );
};

export default CardPanel;

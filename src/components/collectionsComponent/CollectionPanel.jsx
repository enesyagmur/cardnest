import CollectionList from "./CollectionList";
import { useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import EmptyList from "../EmptyList";

const CollectionPanel = ({ formMode, setFormMode }) => {
  const { collections } = useSelector((state) => state.collections);

  return (
    <div className="w-full h-full md:w-5/12 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 shadow-sm rounded-xl px-4 py-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <span className="text-white text-lg">📚</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Koleksiyonlar
          </h1>
        </div>

        <button
          onClick={() => setFormMode("create")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
            formMode === "update"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Yeni Koleksiyon Ekle"
          title="Yeni Koleksiyon Ekle"
        >
          <FiPlus size={18} />
          <span>Yeni</span>
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-120px)]">
        {collections.length > 0 ? (
          <div className="h-full">
            <CollectionList
              setFormMode={setFormMode}
              collections={collections}
            />
          </div>
        ) : (
          <EmptyList
            title={"Henüz koleksiyon bulunmuyor"}
            content={
              "Kart oluşturmak ve ardından pratik yapmak için önce bir koleksiyon eklemelisiniz"
            }
            height={"h-full"}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPanel;

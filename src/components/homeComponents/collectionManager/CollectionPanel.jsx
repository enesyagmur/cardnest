import CollectionList from "./CollectionList";
import { useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import EmptyList from "../EmptList";

const CollectionPanel = ({ formMode, setFormMode }) => {
  const { collections } = useSelector((state) => state.collections);

  return (
    <div className="w-full sm:w-5/12 bg-white border rounded-lg shadow-sm p-4 space-y-6 min-h-[580px]">
      <div className="flex items-center justify-between px-3 py-2 border border-gray-200 shadow-sm  rounded-lg">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold  tracking-wide text-blue-400">
            Koleksiyonlar
          </h1>
        </div>

        <button
          onClick={() => setFormMode("create")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition
      ${
        formMode === "update"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-200 text-gray-700 cursor-none"
      }`}
          aria-label="Yeni Koleksiyon Ekle"
          title="Yeni Koleksiyon Ekle"
        >
          <FiPlus size={18} />
          Yeni
        </button>
      </div>
      {collections.length > 0 ? (
        <CollectionList setFormMode={setFormMode} collections={collections} />
      ) : (
        <EmptyList
          title={"Henüz koleksiyon bulunmuyor"}
          content={
            "Kart oluşturmak ve ardından pratik yapmak için önce bir koleksiyon eklemelisiniz"
          }
          height={"h-[calc(100vh-270px)]"}
        />
      )}
    </div>
  );
};

export default CollectionPanel;

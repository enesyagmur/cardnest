import { useState } from "react";
import CardDetail from "./CardDetail";
import {
  IoArrowBackOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { BsCardText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";
const CollectionDetail = ({ collection, onBack }) => {
  const [showCardBackId, setShowCardBackId] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(collection);

  const cloneCollection = async () => {
    const cloneData = {
      userId: user.uid,
      creator: user.displayName,
      title: collection.title,
      description: collection.description,
      visibility: "private",
      cards: collection.cards,
      tags: collection.tags,
    };

    try {
      const _result = await dispatch(addCollection(cloneData)).unwrap();
      NotifyCustom("success", "Koleksiyonlarıma kayıt edildi");
    } catch (err) {
      NotifyCustom(
        "error",
        `CollectionDetail | Koleksiyon kaydedilirken hata: ${err}`
      );
    }
  };
  return (
    <div className="w-full h-[590px] bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 ">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:scale-105"
            aria-label="Koleksiyon detayından geri dön"
          >
            <IoArrowBackOutline className="w-4 h-4" />
            Geri
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            {user.displayName !== collection.creator ? (
              <button
                onClick={cloneCollection}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-500 border border-green-500 font-medium text-sm rounded-lg hover:bg-green-600 hover:text-white active:bg-green-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <IoSaveOutline className="mr-1" /> Kaydet
              </button>
            ) : (
              <>
                <BsCardText className="w-4 h-4" />
                <span>{collection.cards.length} kart</span>
              </>
            )}
          </div>
        </div>

        <div className="text-center space-y-2 ">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {collection.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="p-6 ">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <BsCardText className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Kartlar</h3>
        </div>

        <div className="space-y-4 h-[300px] overflow-y-auto pr-2">
          {collection.cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-lg capitalize">
                      {card.front}
                    </h4>
                  </div>

                  <button
                    onClick={() =>
                      setShowCardBackId((prev) =>
                        prev === card.id ? "" : card.id
                      )
                    }
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  >
                    {showCardBackId === card.id ? (
                      <>
                        <IoChevronUpOutline className="w-4 h-4" />
                        Kapat
                      </>
                    ) : (
                      <>
                        <IoChevronDownOutline className="w-4 h-4" />
                        Detay
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Content */}
              {showCardBackId === card.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <CardDetail card={card} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;

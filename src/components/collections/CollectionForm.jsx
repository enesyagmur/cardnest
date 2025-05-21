import React, { useState } from "react";

const CollectionForm = () => {
  const [newCollection, setNewCollection] = useState({
    id: Date.now(),
    title: "",
    description: "",
    cards: [],
  });

  const handleSaveCollection = (e) => {
    e.preventDefault();

    if (newCollection.title !== "") {
      const storedCollections = localStorage.getItem("collectionList");
      const collectionList = storedCollections
        ? JSON.parse(storedCollections)
        : [];

      const updatedCollectionList = [...collectionList, newCollection];
      localStorage.setItem(
        "collectionList",
        JSON.stringify(updatedCollectionList)
      );
      console.log("Koleksiyon Oluşturuldu");
      setNewCollection({
        id: Date.now(),
        title: "",
        description: "",
        cards: [],
      });
    } else {
      alert("Başlık Boş Bırakılamaz");
    }
  };

  return (
    <div className="w-full min-h-[590px] bg-gradient-to-br from-white to-blue-100 rounded-2xl shadow-lg p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Yeni Koleksiyon Oluştur
      </h2>

      <form className="space-y-6" onSubmit={handleSaveCollection}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-base font-medium text-gray-800"
          >
            Koleksiyon Başlığı
          </label>
          <input
            type="text"
            id="title"
            placeholder="Örneğin: İngilizce Fiiller"
            onChange={(e) =>
              setNewCollection((prev) => ({ ...prev, title: e.target.value }))
            }
            value={newCollection.title}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 capitalize bg-blue-100/50 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-sm transition-shadow duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-base font-medium text-gray-800"
          >
            Açıklama (isteğe bağlı)
          </label>
          <textarea
            id="description"
            rows="4"
            placeholder="Koleksiyon hakkında kısa bir açıklama yazabilirsiniz..."
            onChange={(e) =>
              setNewCollection((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={newCollection.description}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-blue-100/50 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-sm transition-shadow duration-300 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
        >
          Koleksiyonu Oluştur
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;

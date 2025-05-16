import React, { useState } from "react";

const CollectionForm = () => {
  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
    cards: [],
  });

  const handleSaveCollection = (e) => {
    e.preventDefault();
    const collectionWithId = { id: Date.now(), ...newCollection };

    if (newCollection.title !== "") {
      const storedCollections = localStorage.getItem("collectionList");
      const collectionList = storedCollections
        ? JSON.parse(storedCollections)
        : [];

      const updatedCollectionList = [...collectionList, collectionWithId];
      localStorage.setItem(
        "collectionList",
        JSON.stringify(updatedCollectionList)
      );
      console.log("Koleksiyon Oluşturuldu");
      setNewCollection({
        id: "",
        title: "",
        description: "",
        cards: [],
      });
    } else {
      alert("Başlık Boş Bırakılamaz");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Yeni Koleksiyon Oluştur
      </h2>

      <form className="space-y-5" onSubmit={handleSaveCollection}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-medium text-gray-700"
          >
            Koleksiyon Başlığı
          </label>
          <input
            type="text"
            id="title"
            placeholder="Başlık girin"
            onChange={(e) =>
              setNewCollection((prev) => ({ ...prev, title: e.target.value }))
            }
            value={newCollection.title}
            className="w-full border border-gray-300 rounded-md px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-700"
          >
            Açıklama (isteğe bağlı)
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Koleksiyon hakkında kısa bilgi"
            onChange={(e) =>
              setNewCollection((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={newCollection.description}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Oluştur
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;

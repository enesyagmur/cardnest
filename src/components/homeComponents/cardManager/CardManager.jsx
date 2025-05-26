import React, { useState } from "react";
import CardPanel from "./CardPanel";
import CardForm from "./CardForm";
import { useSelector } from "react-redux";
import EmptyList from "../EmptList";

const CardManager = () => {
  const [formMode, setFormMode] = useState("create");
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  console.log("id : ", selectedCollectionId);

  if (!selectedCollection || !selectedCollection.title) {
    return (
      <EmptyList
        title={"Koleksiyon Seçilmedi!"}
        content={
          "Henüz bir koleksiyonunuz bulunmuyorsa, koleksiyonlar bölümünden hemen oluşturabilirsiniz"
        }
        height={"h-[calc(100vh-150px)]"}
      />
    );
  } else if (selectedCollection.title) {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 p-4 bg-gray-100  rounded-xl">
        <CardPanel
          formMode={formMode}
          setFormMode={setFormMode}
          collection={selectedCollection}
        />

        <CardForm
          formMode={formMode}
          setFormMode={setFormMode}
          collection={selectedCollection}
        />
      </div>
    );
  }
};

export default CardManager;

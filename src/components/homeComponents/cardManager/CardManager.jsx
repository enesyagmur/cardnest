import React, { useState } from "react";
import CardPanel from "./CardPanel";
import CardForm from "./CardForm";
import { useSelector } from "react-redux";
import EmptyList from "../EmptList";

const CardManager = () => {
  const [formMode, setFormMode] = useState("create");
  const collection = useSelector((state) => state.selectCollection.col);

  if (!collection || !collection.title) {
    return (
      <EmptyList
        title={"Koleksiyon Seçilmedi!"}
        content={
          "Henüz bir koleksiyonunuz bulunmuyorsa, koleksiyonlar bölümünden hemen oluşturabilirsiniz"
        }
        height={"h-[calc(100vh-150px)]"}
      />
    );
  } else if (collection.title) {
    return (
      <div className="w-full flex flex-col md:flex-row gap-6 p-4 bg-gray-100  rounded-xl">
        <CardPanel
          formMode={formMode}
          setFormMode={setFormMode}
          collection={collection}
        />

        <CardForm
          formMode={formMode}
          setFormMode={setFormMode}
          collection={collection}
        />
      </div>
    );
  }
};

export default CardManager;

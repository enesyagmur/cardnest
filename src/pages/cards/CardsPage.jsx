import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardPanel from "../../components/cardsComponent/CardPanel";
import CardForm from "../../components/cardsComponent/CardForm";
import EmptyList from "../../components/EmptyList";
import CardTemplate from "../../components/cardsComponent/CardTemplate";

const CardsPage = () => {
  const [formMode, setFormMode] = useState("create");
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

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
      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-2 p-4 bg-gray-100  rounded-xl overflow-y-auto">
        <CardPanel
          formMode={formMode}
          setFormMode={setFormMode}
          collection={selectedCollection}
        />
        {formMode === "template" ? (
          <CardTemplate />
        ) : (
          <CardForm
            formMode={formMode}
            setFormMode={setFormMode}
            collection={selectedCollection}
          />
        )}
      </div>
    );
  }
};

export default CardsPage;

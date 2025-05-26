import React, { useState } from "react";
import CollectionForm from "./CollectionForm";
import CollectionPanel from "./CollectionPanel";

const CollectionManager = () => {
  const [formMode, setFormMode] = useState("create");

  return (
    <div className="w-full flex flex-col sm:flex-row gap-6 p-4 bg-gray-100 h-full rounded-xl">
      <CollectionPanel formMode={formMode} setFormMode={setFormMode} />

      <CollectionForm setFormMode={setFormMode} formMode={formMode} />
    </div>
  );
};

export default CollectionManager;

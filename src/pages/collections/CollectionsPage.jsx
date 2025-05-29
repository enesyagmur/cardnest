// pages/Home.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCollections } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import Loading from "../../components/Loading";
import CollectionPanel from "../../components/collectionsComponent/CollectionPanel";
import CollectionForm from "../../components/collectionsComponent/CollectionForm";

function CollectionsPage() {
  const user = useSelector((state) => state.auth.user);
  const { isLoading } = useSelector((state) => state.collections);
  const [formMode, setFormMode] = useState("create");

  const dispatch = useDispatch();

  const getCollections = async () => {
    try {
      await dispatch(fetchCollections(user.uid)).unwrap();
    } catch (err) {
      NotifyCustom("error", `Koleksiyonlar getirilirken hata: ${err?.message}`);
    }
  };

  useEffect(() => {
    if (user.uid) {
      getCollections();
    }
  }, [user?.uid]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <main className="w-full h-full flex flex-col md:flex-row gap-2 p-4 bg-gray-100  rounded-xl overflow-y-auto">
        <CollectionPanel formMode={formMode} setFormMode={setFormMode} />

        <CollectionForm setFormMode={setFormMode} formMode={formMode} />
      </main>
    );
  }
}

export default CollectionsPage;

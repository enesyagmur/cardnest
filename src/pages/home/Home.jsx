// pages/Home.jsx
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollectionManager from "../../components/homeComponents/collectionManager/CollectionManager";
import CardManager from "../../components/homeComponents/cardManager/CardManager";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCollections } from "../../features/collections/collectionsThunks";
import NotifyCustom from "../../utils/NotifyCustom";

function Home() {
  const component = useSelector((state) => state.selectComponent.component);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getCollections = async () => {
    try {
      await dispatch(fetchCollections(user.uid)).unwrap();
    } catch (err) {
      NotifyCustom(
        "error",
        "Koleksiyonlar getirilirken hata: ",
        err?.message || "Bilinmiyor"
      );
    }
  };

  useEffect(() => {
    if (user.uid) {
      getCollections();
    }
  }, [user?.uid]);

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-pink-200
"
    >
      <Header />

      <main className="w-full min-h-[560px] md:w-11/12 flex items-center justify-center py-2">
        {component === "collectionManager" && <CollectionManager />}

        {component === "cardManager" && <CardManager />}
      </main>

      <Footer />
    </div>
  );
}

export default Home;

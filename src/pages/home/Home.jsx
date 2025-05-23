// pages/Home.jsx
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CollectionList from "../../components/homeComponents/collections/CollectionList";
import Practice from "../../components/homeComponents/practice/Practice";
import CollectionForm from "../../components/homeComponents/collections/CollectionForm";

function Home() {
  const [page, setPage] = useState("collectionForm");

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-pink-200
"
    >
      <Header page={page} setPage={setPage} />

      <main className="w-full min-h-[590px] md:w-11/12 flex items-center justify-center py-2">
        {page === "collectionForm" && <CollectionForm />}
        {page === "collectionList" && <CollectionList setPage={setPage} />}
        {page === "practice" && <Practice setPage={setPage} />}
      </main>

      <Footer />
    </div>
  );
}

export default Home;

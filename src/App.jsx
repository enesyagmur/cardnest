import { useState } from "react";
import Header from "./components/Header";
import CollectionList from "./components/collections/CollectionList";
import CollectionForm from "./components/collections/CollectionForm";
import Practice from "./components/practice/Practice";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("collectionForm");
  const [collectionForPractice, setCollectionForPractice] = useState({});

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-[#a3cef1] via-[#a8d5ba] to-[#ffb6b9] bg-[length:800%_800%] animate-gradientShift">
      <Header page={page} setPage={setPage} />

      <main className="w-full min-h-[590px]  md:w-11/12 flex items-center justify-center py-2">
        {page === "collectionForm" && <CollectionForm />}
        {page === "collectionList" && (
          <CollectionList
            setPage={setPage}
            setCollectionForPractice={setCollectionForPractice}
          />
        )}
        {page === "practice" && (
          <Practice collection={collectionForPractice} setPage={setPage} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

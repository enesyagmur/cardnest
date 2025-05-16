import { useState } from "react";
import Header from "./components/Header";
import CollectionList from "./components/collections/CollectionList";
import CollectionForm from "./components/collections/CollectionForm";
import Practice from "./components/practice/Practice";
import "./App.css";

function App() {
  // Sayfa durumu: 'collections', 'collectionForm', 'practice'
  const [page, setPage] = useState("collectionForm");

  // Sayfa ve seçilen koleksiyon değiştiğinde component render olur
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200">
      <Header page={page} setPage={setPage} />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        {page === "collectionForm" && <CollectionForm />}
        {page === "collectionList" && <CollectionList />}
        {page === "practice" && <Practice />}
      </main>

      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
        © 2025 CardNest - Basit Kart Uygulaması
      </footer>
    </div>
  );
}

export default App;

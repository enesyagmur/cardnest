import { useState } from "react";
import "./App.css";
import CardForm from "./components/cardForm/CardForm";
import Practice from "./components/practice/Practice";

function App() {
  const [page, setPage] = useState("form"); // 'form' veya 'practice'

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4">
        <nav className="container mx-auto flex justify-center gap-8">
          <button
            className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
              page === "form"
                ? "bg-blue-600 text-white shadow-md shadow-blue-300"
                : "text-blue-600 hover:bg-blue-100"
            }`}
            onClick={() => setPage("form")}
            aria-label="Kart Oluşturma Sayfasına Git"
          >
            Kart Oluştur
          </button>
          <button
            className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
              page === "practice"
                ? "bg-blue-600 text-white shadow-md shadow-blue-300"
                : "text-blue-600 hover:bg-blue-100"
            }`}
            onClick={() => setPage("practice")}
            aria-label="Kartlarla Pratik Sayfasına Git"
          >
            Pratik Yap
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-10 max-w-3xl">
        {page === "form" && <CardForm />}
        {page === "practice" && <Practice />}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
        © 2025 CardNest - Basit Kart Uygulaması
      </footer>
    </div>
  );
}

export default App;

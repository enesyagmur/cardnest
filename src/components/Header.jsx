export default function Header({ page, setPage }) {
  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto flex justify-center gap-8">
        <button
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "collectionForm"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("collectionForm")}
          aria-label="Koleksiyon Oluştur Sayfasına Git"
        >
          Koleksiyon Oluştur
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "collections"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("collectionList")}
          aria-label="Koleksiyonlar Sayfasına Git"
        >
          Koleksiyonlar
        </button>

        <button
          className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "practice"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("practice")}
          aria-label="Pratik Yap Sayfasına Git"
        >
          Pratik Yap
        </button>
      </nav>
    </header>
  );
}

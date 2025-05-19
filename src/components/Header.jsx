import {
  AiFillEdit,
  AiOutlineUnorderedList,
  AiOutlinePlayCircle,
} from "react-icons/ai";

export default function Header({ page, setPage }) {
  return (
    <header className="w-full md:w-11/12 rounded-b-xl bg-white shadow-md py-4">
      <nav className="container mx-auto flex justify-center flex-wrap gap-4 sm:gap-8 px-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "collectionForm"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("collectionForm")}
          aria-label="Koleksiyon Oluştur Sayfasına Git"
        >
          <AiFillEdit className="text-lg" />
          <span className="hidden sm:inline">Koleksiyon Oluştur</span>
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "collectionList"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("collectionList")}
          aria-label="Koleksiyonlar Sayfasına Git"
        >
          <AiOutlineUnorderedList className="text-lg" />
          <span className="hidden sm:inline">Koleksiyonlar</span>
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
            page === "practice"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setPage("practice")}
          aria-label="Pratik Yap Sayfasına Git"
        >
          <AiOutlinePlayCircle className="text-lg" />
          <span className="hidden sm:inline">Pratik Yap</span>
        </button>
      </nav>
    </header>
  );
}

import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";

const SearchBar = ({ searchTerm, onChange, selected, onSelect }) => {
  const tags = [
    "Hepsi",
    "Bilim",
    "Tıp",
    "Teknoloji",
    "Yazılım",
    "İngilizce",
    "Tarih",
    "Edebiyat",
  ];
  return (
    <div className="w-full max-w-4xl space-y-4 mt-8">
      {/* Arama Kutusu */}
      <div className="relative group">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-purple-300 transition-all duration-200">
          {/* Arama İkonu */}
          <div className="flex-shrink-0">
            <IoSearchOutline className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={onChange}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm font-medium"
            placeholder="Koleksiyon ara..."
          />

          {/* Temizle Butonu */}
          {searchTerm && (
            <button
              onClick={() => onChange({ target: { value: "" } })}
              className="flex-shrink-0 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
            >
              <IoCloseOutline className="w-3 h-3 text-gray-500 group-hover:text-gray-700" />
            </button>
          )}
        </div>

        {/* Focus Ring */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-300 ring-opacity-0 group-focus-within:ring-opacity-20 transition-all duration-200 pointer-events-none"></div>
      </div>

      {/* Tag Butonları */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${
              selected === tag
                ? "bg-purple-500 text-white shadow-md hover:bg-purple-500"
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
            }`}
            onClick={() => onSelect(tag)}
          >
            {tag}
            {selected === tag && (
              <span className="ml-2 w-2 h-2 bg-white rounded-full inline-block"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

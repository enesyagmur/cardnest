const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <div className="w-full max-w-xl flex items-center mt-4 gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        className="flex-1 bg-transparent outline-none text-sm"
        placeholder="Koleksiyon ara..."
      />
    </div>
  );
};

export default SearchBar;

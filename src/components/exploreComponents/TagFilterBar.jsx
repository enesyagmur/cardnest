const TagFilterBar = ({ selected, onSelect }) => {
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
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`px-3 py-1 text-sm rounded-lg transition hover:bg-purple-300 ${
            selected === tag
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilterBar;

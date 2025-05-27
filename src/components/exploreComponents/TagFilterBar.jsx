const TagFilterBar = ({ tags, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`px-3 py-1 text-sm rounded-full transition ${
            selected === tag
              ? "bg-blue-600 text-white"
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

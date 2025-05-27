import { BsFiles } from "react-icons/bs";
import { MdPerson } from "react-icons/md";

const CollectionInExplore = ({
  title,
  description,
  cards,
  creator,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-5/12 mb-6 flex flex-col justify-between"
      aria-label={`Koleksiyon: ${title}, kart sayısı: ${cards.length}, yaratan: ${creator}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-400">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-2 text-green-300">
            <BsFiles className="text-lg" />
            {cards.length}
          </span>
          <span className="flex items-center gap-2 text-pink-300">
            <MdPerson className="text-lg" />
            {creator}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionInExplore;

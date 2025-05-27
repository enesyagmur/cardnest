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
      className="cursor-pointer p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full md:w-5/12 mb-6 flex flex-col justify-between"
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
        <h3 className="text-lg font-semibold mb-2 text-purple-400 capitalize ">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center gap-6 text-sm text-gray-400 ">
          <span className="flex items-center gap-1">
            <BsFiles className="text-lg text-green-300" />
            {cards.length}
          </span>
          <span className="flex items-center gap-1 ">
            <MdPerson className="text-lg text-blue-300" />
            {creator}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionInExplore;

import { BsFiles } from "react-icons/bs";
import { MdPerson } from "react-icons/md";

const CollectionInExplore = ({
  title,
  description,
  cards,
  creator,
  updatedAt,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer p-6 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-200 w-full md:w-5/12  flex flex-col justify-between hover:-translate-y-1"
      aria-label={`Koleksiyon: ${title}, kart sayısı: ${cards.length}, yaratan: ${creator}, güncellenme tarihi: ${updatedAt}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="space-y-4">
        {/* Başlık */}
        <div className="w-full h-8 flex items-center justify-between">
          <h3 className="text-xl font-bold capitalize text-gray-600 group-hover:text-purple-500 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Açıklama */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 capitalize">
          {description}
        </p>

        {/* İstatistikler ve Güncelleme */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                <BsFiles className="text-sm text-purple-500" />
              </div>
              <span className="text-sm font-medium">{cards.length} kart</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                <MdPerson className="text-sm text-gray-600" />
              </div>
              <span className="text-sm font-medium capitalize">{creator}</span>
            </div>
          </div>

          {/* Güncelleme tarihi */}
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="hidden sm:inline">
              {new Date(updatedAt).toLocaleDateString("tr-TR")}
            </span>
            <span className="sm:hidden">
              {new Date(updatedAt).toLocaleDateString("tr-TR", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionInExplore;

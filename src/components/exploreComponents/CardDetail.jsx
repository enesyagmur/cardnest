import { FaImage } from "react-icons/fa";

const CardDetail = ({ card }) => {
  return (
    <div className="space-y-1">
      {card.back.map((item) => {
        if (item.type === "paragraph") {
          return (
            <div
              className="bg-white p-2 rounded border border-gray-200 shadow-sm"
              key={item.id}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-800 truncate">
                    {item.paragraphTitle}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">
                    {item.paragraphContent}
                  </p>
                </div>
              </div>
            </div>
          );
        }

        if (item.type === "description") {
          return (
            <div
              key={item.id}
              className="bg-white p-2 rounded border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 italic truncate">
                  {item.description}
                </p>
              </div>
            </div>
          );
        }

        if (item.type === "image") {
          return (
            <div
              key={item.id}
              className="bg-white p-2 rounded border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-3 h-3 bg-pink-200 rounded-full">
                  <FaImage className="text-pink-600 text-[8px]" />
                </div>
                <img
                  src={item.url}
                  alt="card image"
                  className="w-8 h-8 object-cover rounded"
                />
              </div>
            </div>
          );
        }

        if (item.type === "list") {
          return (
            <div
              key={item.id}
              className="bg-white p-2 rounded border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-800 truncate">
                    {item.listTitle}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    {item.listArray.slice(0, 3).map((dot) => (
                      <div
                        key={dot.id}
                        className="w-1 h-1 bg-green-500 rounded-full"
                      ></div>
                    ))}
                    {item.listArray.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{item.listArray.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default CardDetail;

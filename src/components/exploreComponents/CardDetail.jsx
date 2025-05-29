const CardDetail = ({ card }) => {
  return (
    <div className="space-y-3">
      {card.back.map((item) => {
        if (item.type === "paragraph") {
          return (
            <div
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              key={item.id}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    {item.paragraphTitle}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
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
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        }

        if (item.type === "list") {
          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-green-600"
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
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">
                    {item.listTitle}
                  </h4>
                  <ul className="space-y-2">
                    {item.listArray.map((dot) => (
                      <li
                        key={dot.id}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{dot.value}</span>
                      </li>
                    ))}
                  </ul>
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

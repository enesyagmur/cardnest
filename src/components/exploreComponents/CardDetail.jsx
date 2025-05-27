const CardDetail = ({ card }) => {
  return (
    <div className="w-full h-[300px] flex flex-col gap-2 items-start justify-start overflow-y-auto p-4 rounded-lg shadow-sm bg-white">
      {card.back.map((item) => {
        if (item.type === "paragraph") {
          return (
            <div
              className="w-full bg-white p-3 rounded-md border border-gray-200 mb-2"
              key={item.id}
            >
              <h3 className="text-sm font-semibold text-gray-800">
                {item.paragraphTitle}
              </h3>
              <p className="text-xs text-gray-700 mt-1 leading-snug">
                {item.paragraphContent}
              </p>
            </div>
          );
        }

        if (item.type === "description") {
          return (
            <p
              key={item.id}
              className="w-full text-xs text-center text-gray-600 italic bg-gray-50 p-2 rounded-md border border-gray-200 mb-2"
            >
              {item.description}
            </p>
          );
        }

        if (item.type === "list") {
          return (
            <div
              key={item.id}
              className="w-full bg-gray-50 p-2 rounded-md border border-gray-200 mb-2"
            >
              <h3 className="text-sm font-semibold text-blue-700 mb-1">
                {item.listTitle}
              </h3>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 pl-2">
                {item.listArray.map((dot) => (
                  <li key={dot.id}>{dot.value}</li>
                ))}
              </ul>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default CardDetail;

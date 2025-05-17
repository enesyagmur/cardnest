import { FaRegNewspaper, FaRegListAlt, FaListUl } from "react-icons/fa";

const PracticeCard = ({ card }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Paragraph List */}
      {card.back.paragraphList.length > 0 && (
        <div className="space-y-4">
          {card.back.paragraphList.map((p, i) => (
            <div key={i}>
              <div className="flex items-center gap-2">
                <FaRegNewspaper className="text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-700">
                  {p.paragraphTitle}
                </h3>
              </div>
              <p className="text-gray-700 mt-1 ml-6">{p.paragraphContent}</p>
            </div>
          ))}
        </div>
      )}

      {/* Description List */}
      {card.back.descriptionList.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <FaRegListAlt className="text-gray-700" />
            <h4 className="font-semibold text-gray-800">Descriptions:</h4>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-1">
            {card.back.descriptionList.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Dot List */}
      {card.back.dotList.length > 0 && (
        <div className="space-y-6">
          {card.back.dotList.map((dot, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2">
                <FaListUl className="text-blue-600" />
                <h4 className="font-semibold text-blue-600">{dot.listTitle}</h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-1">
                {dot.listArray.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeCard;

import { FaRegNewspaper, FaRegListAlt, FaListUl } from "react-icons/fa";
import ParagraphInPracticeItem from "./ParagraphInPracticeItem";
import DescriptionInPracticeItem from "./DescriptionInPracticeItem";
import ListInPracticeItem from "./ListInPracticeItem";

const PracticeCard = ({ card }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {card.back.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          {/* dinamik render  */}
          {item.type === "paragraph" && <ParagraphInPracticeItem item={item} />}
          {item.type === "description" && (
            <DescriptionInPracticeItem item={item} />
          )}
          {item.type === "list" && <ListInPracticeItem item={item} />}
        </div>
      ))}
    </div>
  );
};

export default PracticeCard;

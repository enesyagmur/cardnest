import ParagraphInPracticeItem from "./ParagraphInPracticeItem";
import DescriptionInPracticeItem from "./DescriptionInPracticeItem";
import ListInPracticeItem from "./ListInPracticeItem";

const PracticeCard = ({ card }) => {
  return (
    <div className="w-full min-h-[430px] flex flex-col items-start justify-evenly overflow-y-auto p-6  rounded-xl shadow-md ">
      {card.back.map((item, index) => (
        <div
          key={index}
          className="w-full p-4 border border-gray-200 bg-white rounded-lg "
        >
          {/* Dinamik içerik türüne göre uygun bileşeni göster */}
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

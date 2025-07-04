import ParagraphInPracticeItem from "./ParagraphInPracticeItem";
import DescriptionInPracticeItem from "./DescriptionInPracticeItem";
import ListInPracticeItem from "./ListInPracticeItem";
import ImageInPracticeItem from "./ImageInPracticeItem";

const PracticeCard = ({ card }) => {
  return (
    <div className="w-full min-h-[200px] max-h-[490px] flex flex-col items-start justify-evenly  p-2 ">
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
          {item.type === "image" && <ImageInPracticeItem item={item} />}
          {item.type === "list" && <ListInPracticeItem item={item} />}
        </div>
      ))}
    </div>
  );
};

export default PracticeCard;

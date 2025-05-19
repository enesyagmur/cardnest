import Description from "./Description";
import List from "./List";
import Paragraph from "./Paragraph";

const CardFormItem = ({ item, index, dispatch }) => {
  if (item.type === "paragraph") {
    return <Paragraph index={index} dispatch={dispatch} />;
  } else if (item.type === "description") {
    return <Description index={index} dispatch={dispatch} />;
  } else {
    return <List index={index} item={item} dispatch={dispatch} />;
  }
};

export default CardFormItem;

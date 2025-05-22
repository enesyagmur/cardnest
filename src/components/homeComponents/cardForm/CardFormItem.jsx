import Description from "./Description";
import List from "./List";
import Paragraph from "./Paragraph";

const CardFormItem = ({ item, id, dispatch }) => {
  if (item.type === "paragraph") {
    return <Paragraph id={id} dispatch={dispatch} />;
  } else if (item.type === "description") {
    return <Description id={id} dispatch={dispatch} />;
  } else {
    return <List id={id} item={item} dispatch={dispatch} />;
  }
};

export default CardFormItem;

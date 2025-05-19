import DeleteCardFormItem from "./DeleteCardFormItem";

const Description = ({ index, dispatch }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 relative"
      key={index}
    >
      <DeleteCardFormItem index={index} dispatch={dispatch} />
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none"
        placeholder="Açıklama yazınız..."
        onChange={(e) =>
          dispatch({
            type: "SET_DESCRIPTION",
            payload: { index: index, value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default Description;

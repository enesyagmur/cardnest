import DeleteCardFormItem from "./DeleteCardFormItem";

const Description = ({ id, dispatch }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 relative"
      key={id}
    >
      <DeleteCardFormItem id={id} dispatch={dispatch} />
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded-md  focus:outline-none"
        placeholder="Açıklama yazınız..."
        onChange={(e) =>
          dispatch({
            type: "SET_DESCRIPTION",
            payload: { id: id, value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default Description;

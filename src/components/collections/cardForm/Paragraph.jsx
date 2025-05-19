import DeleteCardFormItem from "./DeleteCardFormItem";

const Paragraph = ({ id, dispatch }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group"
      key={id}
    >
      <div className="flex items-center gap-2">
        <DeleteCardFormItem id={id} dispatch={dispatch} />
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Paragraf başlığı"
          onChange={(e) =>
            dispatch({
              type: "SET_PARAGRAPH_TITLE",
              payload: { id: id, value: e.target.value },
            })
          }
        />
      </div>

      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-purple-500"
        placeholder="Paragraf içeriğini yazınız..."
        onChange={(e) =>
          dispatch({
            type: "SET_PARAGRAPH_CONTENT",
            payload: { id: id, value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default Paragraph;

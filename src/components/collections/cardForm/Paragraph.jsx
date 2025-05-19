import DeleteCardFormItem from "./DeleteCardFormItem";

const Paragraph = ({ index, dispatch }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group"
      key={index}
    >
      <div className="flex items-center gap-2">
        <DeleteCardFormItem index={index} dispatch={dispatch} />
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Paragraf başlığı"
          onChange={(e) =>
            dispatch({
              type: "SET_PARAGRAPH_TITLE",
              payload: { index: index, value: e.target.value },
            })
          }
        />
      </div>

      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
        placeholder="Paragraf içeriğini yazınız..."
        onChange={(e) =>
          dispatch({
            type: "SET_PARAGRAPH_CONTENT",
            payload: { index: index, value: e.target.value },
          })
        }
      />
    </div>
  );
};

export default Paragraph;

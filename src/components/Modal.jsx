import React from "react";

const Modal = ({ setModalOpen, question, setAnswer }) => {
  const handleClick = (answer) => {
    setAnswer(answer);
    setModalOpen(false);
  };

  return (
    <div className="w-full h-[570px] fixed inset-0 z-50 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
      <div className="bg-white w-11/12  rounded-xl shadow-lg p-20">
        <p className="text-xl font-bold text-center mb-3 text-red-400">
          {question}?
        </p>
        <p className="text-sm text-center mb-6 text-gray-500">
          Bu işlem geri alınamaz.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleClick(false)}
            className="px-5 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Vazgeç
          </button>
          <button
            onClick={() => handleClick(true)}
            className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Evet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

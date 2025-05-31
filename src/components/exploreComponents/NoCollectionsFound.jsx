import { FiSearch } from "react-icons/fi";

const NoCollectionsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 md:h-80  rounded-lg  p-6">
      <FiSearch className="text-gray-400 mb-4" size={64} />
      <h3 className="text-gray-700 text-lg md:text-xl font-semibold mb-2">
        Aradığınız koleksiyon bulunamadı
      </h3>
      <p className="text-gray-500 text-center text-sm md:text-base max-w-xs">
        Lütfen arama kriterlerinizi kontrol edin veya farklı kelimeler deneyin.
      </p>
    </div>
  );
};

export default NoCollectionsFound;

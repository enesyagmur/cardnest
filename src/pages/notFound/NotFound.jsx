import { useSelector } from "react-redux";

const NotFound = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#a3cef1] via-[#a8d5ba] to-[#ffb6b9]">
      <div className="text-center p-8 bg-white  rounded-2xl shadow-xl max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Üzgünüz, aradığınız sayfa bulunamadı.
        </p>
        {isAuthenticated ? (
          <a
            href="/home"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Ana sayfaya dön
          </a>
        ) : (
          <a
            href="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Ana sayfaya dön
          </a>
        )}
      </div>
    </div>
  );
};

export default NotFound;

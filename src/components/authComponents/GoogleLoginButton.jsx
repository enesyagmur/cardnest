import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => (
  <button
    type="button"
    className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
  >
    <FcGoogle size={24} />
    <span className="text-gray-700 font-medium">Google ile Giriş Yap</span>
  </button>
);

export default GoogleLoginButton;

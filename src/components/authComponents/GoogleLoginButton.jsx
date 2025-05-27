import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLoginThunk } from "../../features/auth/authThunks";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      console.log("Google Button | Giriş işlemi başlatılıyor...");

      const result = await dispatch(googleLoginThunk()).unwrap();

      console.log("Google Button | Giriş başarılı", result);

      if (result.user) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Google Button | Giriş başarısız:", err);

      if (err.includes("auth/argument-error")) {
        console.error("Firebase yapılandırma hatası");
      } else if (err.includes("auth/popup-closed-by-user")) {
        console.error("Kullanıcı popup'ı kapattı");
      } else if (err.includes("auth/popup-blocked")) {
        console.error("Popup engellendi");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
    >
      <FcGoogle size={24} />
      <span className="text-gray-700 font-medium">Google ile Giriş Yap</span>
    </button>
  );
};

export default GoogleLoginButton;

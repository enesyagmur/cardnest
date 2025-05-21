import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = ({ setShowRegister }) => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <input
          type="email"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="ornek@mail.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Şifre</label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        Giriş Yap
      </button>
      <GoogleLoginButton />
      <p className="text-center text-sm text-gray-600">
        Hesabın yok mu?
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setShowRegister(true)}
        >
          Kayıt Ol
        </button>
      </p>
    </form>
  );
};

export default LoginForm;

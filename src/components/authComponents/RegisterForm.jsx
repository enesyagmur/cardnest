import React from "react";

const RegisterForm = ({ setShowRegister }) => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Adınız Soyadınız"
        />
      </div>
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
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        Kayıt Ol
      </button>
      <p className="text-center text-sm text-gray-600">
        Zaten hesabın var mı?
        <button
          className="text-green-500 hover:underline"
          onClick={() => setShowRegister(false)}
        >
          Giriş Yap
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;

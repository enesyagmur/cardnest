import React, { useState } from "react";
import RegisterForm from "../../components/authComponents/RegisterForm";
import LoginForm from "../../components/authComponents/LoginForm";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#a3cef1] via-[#a8d5ba] to-[#ffb6b9]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {showRegister ? "Kayıt Ol" : "Giriş Yap"}
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            {showRegister
              ? "Hesap oluşturmak için bilgilerinizi girin"
              : "Lütfen bilgilerinizi girerek devam edin"}
          </p>
        </div>
        {showRegister ? (
          <RegisterForm setShowRegister={setShowRegister} />
        ) : (
          <LoginForm setShowRegister={setShowRegister} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

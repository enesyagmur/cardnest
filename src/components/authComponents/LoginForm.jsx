import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationAuthSchemas";
import { loginUser } from "../../services/firebaseAuthService";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setShowRegister }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCredential = await loginUser(data.email, data.password);
      if (userCredential.user) {
        reset();
        navigate("/home");
      }
    } catch (err) {
      console.error("LoginForm da hata: ", err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`mt-1 block w-full border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2`}
          placeholder="ornek@mail.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Şifre</label>
        <input
          type="password"
          id="password"
          className={`mt-1 block w-full border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2`}
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
      <GoogleLoginButton />
      <p className="text-center text-sm text-gray-600">
        Hesabın yok mu?{" "}
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

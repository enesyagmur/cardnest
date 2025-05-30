import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationAuthSchemas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../features/auth/authThunks";
import NotifyCustom from "../../utils/NotifyCustom";

const RegisterForm = ({ setShowRegister }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(registerThunk(data));
      if (user) {
        reset();

        navigate("/collections");
      }
    } catch (err) {
      NotifyCustom("error", "Kayıt Başarısız: ", err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          type="text"
          id="userName"
          {...register("userName")}
          className={`mt-1 block w-full border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2`}
          placeholder="Adınız Soyadınız"
        />
        {errors.userName && (
          <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>
        )}
      </div>
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
          {...register("password")}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Şifre Onaylama
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        {isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}
      </button>
      <p className="text-center text-sm text-gray-600">
        Zaten hesabın var mı?{" "}
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

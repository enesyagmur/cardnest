import * as yup from "yup";

export const registerSchema = yup.object().shape({
  userName: yup.string().required("Kullanıcı ismi zorunludur."),
  email: yup
    .string()
    .email("Geçerli bir e-posta giriniz")
    .required("Email alanı zorunludur.")
    .max(50, "20 karakter uzunluğunu geçemezsiniz"),

  password: yup.string().min(6, "Şifre en az 6 karakter olmalıdır.").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre alanı zorunludur.")
    .max(50, "20 karakter uzunluğunu geçemezsiniz"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta giriniz")
    .required("Email alanı zorunludur.")
    .max(50, "20 karakter uzunluğunu geçemezsiniz"),
  password: yup
    .string()
    .required("Şifre alanı zorunludur.")
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .max(50, "20 karakter uzunluğunu geçemezsiniz"),
});

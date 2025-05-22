import * as yup from "yup";

export const registerSchema = yup.object().shape({
  userName: yup.string().required("Kullanıcı ismi zorunludur."),
  email: yup
    .string()
    .email("Geçerli bir e-posta giriniz")
    .required("Email alanı zorunludur.")
    .max(30, "30 karakter uzunluğunu geçemezsiniz"),

  password: yup.string().min(6, "Şifre en az 6 karakter olmalıdır.").required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre alanı zorunludur.")
    .max(30, "30 karakter uzunluğunu geçemezsiniz"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta giriniz")
    .required("Email alanı zorunludur.")
    .max(30, "30 karakter uzunluğunu geçemezsiniz"),
  password: yup
    .string()
    .required("Şifre alanı zorunludur.")
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .max(30, "30 karakter uzunluğunu geçemezsiniz"),
});

export const collectionSchema = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur.")
    .max(50, "50 karakter uzunluğunu geçemezsiniz"),

  description: yup.string().max(100, "100 karakter uzunluğunu geçemezsiniz"),
});

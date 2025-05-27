import * as yup from "yup";

const newFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur")
    .max(50, "Başlık en fazla 50 karakter içerebilir."),
  description: yup
    .string()
    .min(10, "Açıklama en az 10 karakter olmalı")
    .max(100, "Açıklama en fazla 100 karakter içerebilir."),
  visibility: yup
    .string()
    .oneOf(["public", "private"], "Geçersiz görünürlük seçimi")
    .required("Görünürlük seçimi zorunludur"),
  tags: yup
    .string()
    .optional()
    .max(30, "Tags en fazla 30 karakter içerebilir."),
});

export default newFormSchema;

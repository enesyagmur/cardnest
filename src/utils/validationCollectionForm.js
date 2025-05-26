import * as yup from "yup";

const newFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur")
    .max(30, "Başlık en fazla 30 karakter içerebilir."),
  description: yup
    .string()
    .min(10, "Açıklama en az 10 karakter olmalı")
    .max(50, "Açıklama en fazla 50 karakter içerebilir."),
});

export default newFormSchema;

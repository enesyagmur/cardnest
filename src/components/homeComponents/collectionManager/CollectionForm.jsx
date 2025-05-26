import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import newFormSchema from "../../../utils/validationCollectionForm";
import NotifyCustom from "../../../utils/NotifyCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  updateCollection,
} from "../../../features/collections/collectionsThunks";
import { useEffect } from "react";

const CollectionForm = ({ setFormMode, formMode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const collection = useSelector((state) => state.selectCollection.col);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(newFormSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (formMode === "update" && collection) {
      reset({
        title: collection.title || "",
        description: collection.description || "",
      });
    }
  }, [formMode, collection, reset]);

  const collectionCreate = async (data) => {
    const newColData = {
      userId: user.uid,
      title: data.title,
      description: data.description,
      cards: [],
    };
    try {
      const result = await dispatch(addCollection(newColData)).unwrap();
      console.log("Yeni koleksiyon: ", result);

      reset();
      NotifyCustom("success", "Koleksiyon Oluşturuldu");
    } catch (err) {
      NotifyCustom(
        "error",
        "CollectionForm | Koleksiyon oluşturulurken hata: ",
        err || "Bilinmeyen"
      );
    }
  };

  const collectionUpdate = async (data) => {
    const newData = {
      userId: user.uid,
      colId: collection.id,
      values: {
        title: data.title,
        description: data.description,
      },
    };
    try {
      const _result = await dispatch(updateCollection(newData)).unwrap();

      NotifyCustom("success", `Koleksiyon güncellendi`);
      reset({
        title: "",
        description: "",
      });
      setFormMode("create");
    } catch (err) {
      NotifyCustom(
        "error",
        "Koleksiyon güncellenmesinde sorun: ",
        err || "Bilinmeyen hata"
      );
    }
  };

  const onSubmit = async (data) => {
    if (formMode === "create") {
      await collectionCreate(data);
    } else {
      await collectionUpdate(data);
    }
  };

  return (
    <div className="w-full sm:w-7/12 bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
      <h4
        className={`text-2xl font-bold mb-6 ${
          formMode === "update" ? "text-blue-600" : "text-green-600"
        }`}
      >
        {formMode === "update"
          ? "Koleksiyonu Güncelle"
          : "Yeni Koleksiyon Oluştur"}
      </h4>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Koleksiyon Başlığı
          </label>
          <input
            type="text"
            placeholder="Başlık girin"
            {...register("title")}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Açıklama
          </label>

          <textarea
            placeholder="Açıklama girin"
            {...register("description")}
            className="w-full p-3 border border-gray-300 rounded-md  h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`w-full text-center px-4 py-3 font-semibold rounded-md border transition duration-300
          ${
            formMode === "update"
              ? "text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-white"
              : "text-yellow-600 border-yellow-500 hover:bg-yellow-400 hover:text-white"
          }`}
          >
            {formMode === "update" ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;

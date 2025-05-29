import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import newFormSchema from "../../utils/validationCollectionForm";
import NotifyCustom from "../../utils/NotifyCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  updateCollection,
} from "../../features/collections/collectionsThunks";
import { useEffect } from "react";
import {
  FiLock,
  FiGlobe,
  FiTag,
  FiEdit2,
  FiInfo,
  FiEdit3,
  FiPlus,
} from "react-icons/fi";

const CollectionForm = ({ setFormMode, formMode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const collections = useSelector((state) => state.collections.collections);
  const selectedCollectionId = useSelector(
    (state) => state.collections.selectedCollectionId
  );
  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

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
    if (formMode === "update" && selectedCollection) {
      reset({
        title: selectedCollection.title || "",
        description: selectedCollection.description || "",
        visibility: selectedCollection.visibility || "private",
        tags: selectedCollection.tags || "",
      });
    }
  }, [formMode, selectedCollection, reset]);
  const collectionUpdate = async (data) => {
    const newData = {
      userId: user.uid,
      colId: selectedCollection.id,
      values: {
        title: data.title,
        description: data.description,
        visibility: data.visibility,
        tags: data.tags,
      },
    };
    try {
      await dispatch(updateCollection(newData)).unwrap();

      NotifyCustom("success", `Koleksiyon güncellendi`);

      setFormMode("create");

      reset({
        title: "",
        description: "",
      });
    } catch (err) {
      NotifyCustom("error", `Koleksiyon güncellenmesinde sorun: ${err}`);
    }
  };

  const collectionCreate = async (data) => {
    const newColData = {
      userId: user.uid,
      creator: user.displayName,
      title: data.title,
      description: data.description,
      visibility: data.visibility,
      cards: [],
      tags: data.tags || "",
    };

    try {
      const _result = await dispatch(addCollection(newColData)).unwrap();

      reset();
      NotifyCustom("success", "Koleksiyon Oluşturuldu");
    } catch (err) {
      NotifyCustom(
        "error",
        `CollectionForm | Koleksiyon oluşturulurken hata: ${err}`
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
    <div className="w-full md:w-7/12 bg-white/90 h-full backdrop-blur-sm border border-gray-100 p-6 rounded-lg shadow-xl">
      {/* Header with Icon */}
      <div className="flex items-center mb-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl mr-3 ${
            formMode === "update"
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-gradient-to-r from-emerald-500 to-emerald-600"
          }`}
        >
          {formMode === "update" ? (
            <FiEdit3 className="w-5 h-5 text-white" />
          ) : (
            <FiPlus className="w-5 h-5 text-white" />
          )}
        </div>
        <h4
          className={`text-xl font-bold ${
            formMode === "update" ? "text-blue-600" : "text-emerald-600"
          }`}
        >
          {formMode === "update"
            ? "Koleksiyonu Güncelle"
            : "Yeni Koleksiyon Oluştur"}
        </h4>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Koleksiyon Başlığı
          </label>
          <input
            type="text"
            placeholder="Başlık girin"
            {...register("title")}
            className="w-full px-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Açıklama
          </label>
          <textarea
            placeholder="Açıklama girin"
            {...register("description")}
            className="w-full px-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl h-24 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Visibility */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Görünürlük
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 p-3 bg-gray-50/70 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100/70 transition-colors">
              <input
                type="radio"
                value="private"
                defaultChecked
                {...register("visibility")}
                className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <FiLock className="text-gray-600 w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Sadece Ben
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-gray-50/70 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100/70 transition-colors">
              <input
                type="radio"
                value="public"
                {...register("visibility")}
                className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <FiGlobe className="text-gray-600 w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Herkese Açık
              </span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="flex items-baseline text-sm font-medium text-gray-700">
            Etiketler
            <span className="text-xs text-gray-400 ml-2 font-normal">
              (opsiyoneldir. Belirtmek isterseniz, virgülle ayırarak girin.)
            </span>
          </label>
          <input
            type="text"
            placeholder="ingilizce, kelime"
            {...register("tags")}
            className="w-full px-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-white border border-pink-500 text-pink-400 hover:bg-pink-600 hover:text-white  font-semibold rounded-xl transition  shadow-lg  "
          >
            {formMode === "update" ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;

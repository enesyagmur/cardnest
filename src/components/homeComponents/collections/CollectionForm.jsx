import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionSchema } from "../../../utils/validationAuthSchemas";
import { addCollection } from "../../../features/collections/collectionsThunks";
import NotifyCustom from "../../../utils/NotifyCustom";

const CollectionForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(collectionSchema),
    defaultValues: {
      title: "",
      description: "",
      cards: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const newCol = {
        title: data.title,
        description: data.description,
        cards: [],
      };
      const returnCol = await dispatch(addCollection(newCol)).unwrap;
      if (returnCol) {
        NotifyCustom("success", "Koleksiyon oluşturuldu");
        reset();
      }
    } catch (err) {
      NotifyCustom("error", err);
    }
  };

  return (
    <div className="w-full min-h-[590px] flex items-center justify-center bg-gradient-to-tl  from-white to-blue-50 rounded-2xl shadow-lg p-10">
      <form
        className="space-y-6 w-full h-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-base font-medium text-gray-800 "
          >
            Koleksiyon Başlığı
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Örneğin: İngilizce Fiiller"
            className="w-full border border-gray-300 rounded-lg px-5 py-3 capitalize bg-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition-shadow duration-300"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-base font-medium text-gray-800"
          >
            Açıklama (isteğe bağlı)
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows="4"
            placeholder="Koleksiyon hakkında kısa bir açıklama yazabilirsiniz..."
            className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-sm transition-shadow duration-300 resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-100 text-blue-600 border-2 border-blue-600  hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
        >
          Koleksiyonu Oluştur
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;

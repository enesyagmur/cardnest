import React, { useEffect } from "react";
import { LuLayoutTemplate } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getTemplatesThunk } from "../../features/templates/templatesThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import { setTemplate } from "../../features/templates/templatesSlice";

const TemplateList = () => {
  const { templates, isLoading } = useSelector((state) => state.templates);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTemplates = async (userId) => {
      if (userId && templates === null) {
        try {
          const _userTemplates = await dispatch(
            getTemplatesThunk(userId)
          ).unwrap();
        } catch (err) {
          NotifyCustom(
            "error",
            `TemplateList | Templateleri çekerken sorun: ${
              err || "bilinmeyen hata"
            } `
          );
        }
      }
    };
    fetchTemplates(user.uid);
  }, [templates, user.uid]);

  const handleSelectTemplate = (value) => {
    if (value === "") {
      dispatch(setTemplate(null));
      return;
    }
    const selectedITem = templates.find((item) => item.title === value);
    if (selectedITem) {
      dispatch(setTemplate(selectedITem.elements));
    }
  };

  if (isLoading) {
    return (
      <div className="flex relative right-0 items-center space-x-2 p-2  rounded-md bg-white shadow-sm max-w-xs">
        <LuLayoutTemplate className="text-purple-400 text-xl" /> Yükleniyor...
      </div>
    );
  }

  if (templates !== null && templates?.length !== 0) {
    return (
      <div className="flex relative right-0 items-center space-x-2 p-2  rounded-md bg-white shadow-sm max-w-xs">
        <LuLayoutTemplate className="text-purple-400 text-xl" />

        <select
          className="block w-full py-1 pl-2 pr-8 text-base text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
          onChange={(e) => handleSelectTemplate(e.target.value)}
        >
          <option value="">Şablon Seçiniz...</option>
          {templates.map((item) => (
            <option value={item.title} key={item.id} className="capitalize">
              {item.title}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
};

export default TemplateList;

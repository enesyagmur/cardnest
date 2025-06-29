import React, { useEffect, useState } from "react";
import { LuLayoutTemplate } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTemplateThunk,
  getTemplatesThunk,
} from "../../features/templates/templatesThunks";
import NotifyCustom from "../../utils/NotifyCustom";
import { setTemplate } from "../../features/templates/templatesSlice";
import { RxCrossCircled } from "react-icons/rx";
import { LuCircleArrowOutUpLeft } from "react-icons/lu";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const TemplateList = () => {
  const { templates, isLoading } = useSelector((state) => state.templates);
  const user = useSelector((state) => state.auth.user);
  const [dropDownShow, setDropDownShow] = useState(false);

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

  const handleDeleteTemplate = async (templateId) => {
    try {
      if (!templateId) {
        throw new Error("Template id boş olamaz");
      }
      const data = { userId: user.uid, templateId: templateId };

      await dispatch(deleteTemplateThunk(data)).unwrap();
    } catch (err) {
      throw new Error(err);
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
      <div className="w-48 flex relative right-0 items-center z-50 space-x-2 p-2  rounded-md bg-white shadow-sm ">
        <LuLayoutTemplate
          className="text-purple-400 text-xl"
          onClick={() => setDropDownShow(!dropDownShow)}
        />

        <p
          onClick={() => setDropDownShow(!dropDownShow)}
          className="cursor-pointer"
        >
          Şablon Seçiniz
        </p>
        {!dropDownShow ? (
          <TiArrowSortedDown
            className="text-neutral-600 cursor-pointer"
            onClick={() => setDropDownShow(!dropDownShow)}
          />
        ) : (
          <TiArrowSortedUp
            className="text-neutral-600 cursor-pointer"
            onClick={() => setDropDownShow(!dropDownShow)}
          />
        )}
        {dropDownShow && (
          <div className=" w-full h-96 block absolute overflow-y-auto overflow-x-hidden top-8 right-2   py-1 pl-2 pr-8 text-base text-gray-700 bg-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer">
            {templates.map((item, index) => (
              <div
                key={index}
                className="w-full  m-2 p-2 flex items-center justify-between bg-gray-50 rounded-md shadow-md hover:shadow-lg"
              >
                <p>{item.title}</p>
                <div className="w-6/12 h-full flex justify-evenly">
                  <button
                    className="text-emerald-500 hover:text-emerald-800"
                    title="Seç"
                    onClick={() => handleSelectTemplate(item.title)}
                  >
                    <LuCircleArrowOutUpLeft />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-800"
                    title="Sil"
                    onClick={() => handleDeleteTemplate(item.id)}
                  >
                    <RxCrossCircled />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default TemplateList;

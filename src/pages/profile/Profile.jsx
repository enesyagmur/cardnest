import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiUpload,
} from "react-icons/fi";
import { GoVerified } from "react-icons/go";

import {
  updateEmailService,
  updateNameService,
  updateProfilePhotoService,
} from "../../features/auth/authService";
import NotifyCustom from "../../utils/NotifyCustom";
import { auth } from "../../firebase/firebaseConfig";
import { sendEmailVerification } from "firebase/auth";

const Profile = () => {
  const [photo, setPhoto] = useState();
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdatePhoto = async () => {
    try {
      if (!photo) {
        NotifyCustom("error", "Resim Seçimi Yapılmadı");
      }

      await updateProfilePhotoService(photo);
      NotifyCustom("success", "Profil resmi güncellendi, sayfayı yenileyin.");
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateName = async () => {
    try {
      if (!newName) {
        NotifyCustom("error", "İsim boş bırakılamaz");
      }

      await updateNameService(newName);
      NotifyCustom("success", "Kullanıcı ismi güncellendi");
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      if (!email) {
        NotifyCustom("error", "Mail boş bırakılamaz");
      }

      await updateEmailService(email);
      NotifyCustom("success", "Kullanıcı maili güncellendi");
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSendVerification = async () => {
    try {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        NotifyCustom(
          "success",
          "Doğrulama maili gönderildi. Lütfen e-postanı kontrol et."
        );
      } else {
        NotifyCustom("info", "Email zaten doğrulanmış.");
      }
    } catch (err) {
      NotifyCustom("error", `Doğrulama maili gönderilemedi, ${err}`);
    }
  };

  return (
    <div className="w-full lg:h-[590px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6">
      <div className="w-full  h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Section - Profile Picture and User Info */}
          <div className="lg:w-2/5 flex flex-col p-6 bg-white border-r border-purple-100">
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-1 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  {auth.currentUser.photoURL ? (
                    <img
                      src={auth.currentUser.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <FiUser className="w-16 h-16 text-purple-500 p-3" />
                    </div>
                  )}
                </div>
                <label
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-purple-100"
                  aria-label="Change profile picture"
                >
                  <FiUpload className="w-4 h-4" />

                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                onClick={handleUpdatePhoto}
                className="w-full max-w-xs mb-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                <FiCamera className="w-4 h-4" />
                <span className="text-sm">Resim Güncelle</span>
              </button>

              <div className="w-full space-y-3 text-center">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800 truncate capitalize">
                    {auth.currentUser.displayName || "Kullanıcı Adı"}
                  </h2>
                </div>
                <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                  {auth.currentUser.emailVerified ? (
                    <GoVerified
                      className="text-green-500"
                      title="Email Doğrulandı"
                    />
                  ) : (
                    <GoVerified
                      className="cursor-pointer text-gray-400 hover:text-gray-600"
                      title="Email Doğrula"
                      onClick={handleSendVerification}
                    />
                  )}

                  <p className="text-gray-600 truncate ml-2">
                    {auth.currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Compact Forms */}
          <div className="lg:w-3/5 flex flex-col p-4 sm:p-6">
            <div className="space-y-3 flex-grow">
              {/* Name Update */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-200 to-pink-200 rounded-md flex items-center justify-center">
                    <FiUser className="w-3 h-3 text-purple-600" />
                  </div>
                  <label className="block text-lg font-medium text-gray-600">
                    İsim
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Yeni isim giriniz"
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 px-3 py-2 capitalize rounded-md border border-purple-100 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  <button
                    onClick={handleUpdateName}
                    className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-3 py-2 rounded-md transition-all duration-300 shadow hover:shadow-md focus:outline-none focus:ring-1 focus:ring-purple-300 text-sm"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    <span>Güncelle</span>
                  </button>
                </div>
              </div>

              {/* Email Update */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-md flex items-center justify-center">
                    <FiMail className="w-3 h-3 text-blue-600" />
                  </div>
                  <label className="block text-lg font-medium text-gray-600">
                    Email
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Yeni email giriniz"
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border border-blue-100 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  <button
                    onClick={handleUpdateEmail}
                    className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-3 py-2 rounded-md transition-all duration-300 shadow hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    <span>Güncelle</span>
                  </button>
                </div>
              </div>

              {/* Password Update */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-green-200 to-teal-200 rounded-md flex items-center justify-center">
                    <FiLock className="w-3 h-3 text-green-600" />
                  </div>
                  <label className="block text-lg font-medium text-gray-600">
                    Şifre
                  </label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="w-6/12 flex items-center justify-between">
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 rounded-md border border-green-100 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Yeni şifre giriniz"
                    />
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 ml-2 rounded-md border border-green-100 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Şifreyi tekrar giriniz"
                    />
                  </div>

                  <button className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium px-3 py-2 rounded-md transition-all duration-300 shadow hover:shadow-md focus:outline-none focus:ring-1 focus:ring-green-300 text-sm">
                    <FiEdit2 className="w-3 h-3" />
                    <span>Güncelle</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <FiTrash2 className="w-4 h-4" />
                <span className="text-sm">Hesabımı Sil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

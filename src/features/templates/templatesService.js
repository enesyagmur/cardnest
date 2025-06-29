import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/firebaseConfig";

export const getTemplates = async (userId) => {
  if (!userId) {
    throw new Error("Service | Kullanıcı ID si boş olamaz");
  }
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Service | Kullanıcı bilgileri bulunamadı");
    }

    const userData = userDocSnap.data();
    const userTemplates = userData.cardTemplates || [];
    return userTemplates;
  } catch (err) {
    throw new Error(
      `Service | Kullanıcı şablonları alınamadı: ${
        err.message || "Bilinmeyen bir hata oluştu."
      }`
    );
  }
};

export const addTemplate = async (userId, template) => {
  if (!userId) {
    throw new Error("Service | Kullanıcı ID si boş olamaz");
  }
  if (!template || !template.title || template.elements.length === 0) {
    throw new Error("Service | Template bilgileri boş bırakılamaz");
  }

  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new Error("Service | Kullanıcı bilgisi bulunamadı!");
  }

  const newTemplate = {
    id: uuidv4(),
    title: template.title,
    elements: template.elements,
  };

  await updateDoc(userDocRef, {
    cardTemplates: arrayUnion(newTemplate),
  });
};

export const deleteTemplate = async (userId, templateId) => {
  try {
    if (!userId) {
      throw new Error("Service | Template silinirken sorun: userId eksik");
    }
    if (!templateId) {
      throw new Error("Service | Template silinirken sorun: templateId eksik");
    }

    const userDocRef = doc(db, "users", userId);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
      throw new Error("Service | Kullanıcı bulunamadı");
    }

    const userData = userSnapShot.data();
    const currentTemplates = userData.cardTemplates || [];

    // Template'in var olup olmadığını kontrol et
    const templateExists = currentTemplates.some(
      (template) => template.id === templateId
    );
    if (!templateExists) {
      throw new Error("Service | Silinecek template bulunamadı");
    }

    const newTemplates = currentTemplates.filter(
      (template) => template.id !== templateId
    );

    await updateDoc(userDocRef, {
      cardTemplates: newTemplates,
    });

    return templateId;
  } catch (err) {
    throw new Error(`Service | Template silinirken sorun: ${err.message}`);
  }
};

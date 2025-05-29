import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/firebaseConfig";

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

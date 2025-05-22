import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

/**
 * Belirli bir kullanıcının tüm koleksiyonlarını çeker
 * @returns {Promise<Array>} kullanıcının koleksiyon dizisi
 * @throws {FirebaseError} veri çekme sırasında hata oluşursa
 */

export const getCollectionsByUserId = async (userId) => {
  if (!userId) {
    throw new Error("Kullanıcı ID si boş olamaz");
  }

  try {
    const userColsRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userColsRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.collectionList || [];
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
};

/**
 * Belirli bir kullanıcının collectionList ine yeni bir koleksiyon ekler
 * @param {string} userId kullanıcının id si
 * @param {string} newCollectionTitle koleksiyon başlığı
 * @param {string} newCollectionDescription koleksiyon açıklaması
 * @param {Array} newCollectionCards koleksiyon kart listesi
 * @returns {Promise<object>} eklenen koleksiyon id si oluşturma zmanı ile birlikte
 * @throws {FirebaseError} ekleme sırasında hata oluşursa
 */

export const addCollectionTolist = async (
  userId,
  newCollectioTitle,
  newCollectionDescription,
  newCollectionCards
) => {
  if (!userId) {
    throw new Error("Kullanıcı ID'si boş olamaz.");
  }

  if (!newCollectioTitle) {
    throw new Error("Yeni koleksiyon başlığı boş olamaz.");
  }

  try {
    const collection = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      title: newCollectioTitle,
      description: newCollectionDescription,
      cards: newCollectionCards || [],
    };

    const userColsRef = doc(db, "users", userId);
    await updateDoc(userColsRef, {
      collectionList: arrayUnion(collection),
    });

    return collection;
  } catch (err) {
    console.error("Koleksiyon eklenirken hata oluştu:", err);
    throw err;
  }
};

/**
 * Belirli bir kullanıcının koleksiyon listesinden eleman silme
 * @param {string} userId kullanıcı id
 * @param {string} colId silinecek koleksiyon id
 * @returns {Promise<string>} silinen koleksiyon id
 * @throws {FirebaseErro} silme sırasında hata oluşuursa
 */

export const deleteCollectionFromList = async (userId, colId) => {
  if (!userId) {
    throw new Error("Kullanıcı ID'si boş olamaz.");
  }
  if (!colId) {
    throw new Error("Koleksiyon ID'si boş olamaz.");
  }

  try {
    const userDocRef = doc(db, "users", userId);

    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error(
        "Kullanıcı belgesi bulunamadı veya koleksiyonlar mevcut değil."
      );
    }

    const userData = userDocSnap.data();

    const userCollections = userData.collectionList || [];

    const collectionToRemove = userCollections.find((col) => col.id === colId);

    if (!collectionToRemove) {
      throw new Error("Silinecek koleksiyon bulunamadı.");
    }

    await updateDoc(userDocRef, {
      collectionList: arrayRemove(collectionToRemove),
    });

    return collectionToRemove.id;
  } catch (err) {
    console.error("Koleksiyon silinirken hata oluştu:", err.message, err.code);
    throw err;
  }
};

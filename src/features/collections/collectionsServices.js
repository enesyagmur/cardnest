import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

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

export const addCollectionTolist = async (
  userId,
  newCollectioTitle,
  newCollectionDescription,
  newCollectionCards,
  newCollectionVisibility,
  newCollectionCreator,
  newCollectionTags
) => {
  if (!userId) {
    throw new Error("Kullanıcı ID'si boş olamaz.");
  }

  if (!newCollectioTitle) {
    throw new Error("Yeni koleksiyon başlığı boş olamaz.");
  }

  try {
    let firestoreId = null;

    // PUBLIC ise önce publicCollections a ekle ve id yi al
    if (newCollectionVisibility === "public") {
      const publicColRef = collection(db, "publicCollections");
      const docRef = await addDoc(publicColRef, {
        title: newCollectioTitle,
        description: newCollectionDescription,
        cards: newCollectionCards || [],
        visibility: "public",
        creator: newCollectionCreator,
        tags: newCollectionTags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creatorId: userId,
      });

      firestoreId = docRef.id;
    } else {
      // PRIVATE ise uuidv4 kullanarak benzersiz ID oluştur
      firestoreId = uuidv4();
    }

    const userCollection = {
      id: firestoreId,
      title: newCollectioTitle,
      description: newCollectionDescription,
      cards: newCollectionCards || [],
      visibility: newCollectionVisibility,
      creator: newCollectionCreator,
      tags: newCollectionTags || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Kullanıcının koleksiyon listesine ekle
    const userColsRef = doc(db, "users", userId);
    await updateDoc(userColsRef, {
      collectionList: arrayUnion(userCollection),
    });

    return userCollection;
  } catch (err) {
    console.error("Koleksiyon eklenirken hata oluştu:", err);
    throw err;
  }
};

export const deleteCollectionFromList = async (userId, colId) => {
  if (!userId) throw new Error("Kullanıcı ID'si boş olamaz.");
  if (!colId) throw new Error("Koleksiyon ID'si boş olamaz.");

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists())
      throw new Error(
        "Kullanıcı belgesi bulunamadı veya koleksiyonlar mevcut değil."
      );

    const userData = userDocSnap.data();
    const userCollections = userData.collectionList || [];

    const collectionToRemove = userCollections.find((col) => col.id === colId);

    if (!collectionToRemove)
      throw new Error("Silinecek koleksiyon bulunamadı.");

    // User collection listesinden kaldır
    await updateDoc(userDocRef, {
      collectionList: arrayRemove(collectionToRemove),
    });

    // Eğer public ise Firestoredan sil
    if (collectionToRemove.visibility === "public") {
      const publicColRef = doc(db, "publicCollections", colId);
      await deleteDoc(publicColRef);
    }

    return collectionToRemove; // Tüm obje dönüyor
  } catch (err) {
    console.error("Koleksiyon silinirken hata oluştu:", err.message, err.code);
    throw err;
  }
};

export const updateCollectionFromList = async (userId, colId, values) => {
  if (!userId || !colId) {
    throw new Error("Kullanıcı Id ve Koleksiyon Id boş bırakılamaz");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Kullanıcı Bilgisi Bulunamadı");
    }

    const userData = userDocSnap.data();
    const collectionList = userData.collectionList || [];

    const colIndex = collectionList.findIndex((col) => col.id === colId);
    if (colIndex === -1) {
      throw new Error("Koleksiyon Bulunamadı");
    }

    const currentCollection = collectionList[colIndex];

    const currentVisibility = currentCollection.visibility;

    const updatedCurrentCollection = {
      ...currentCollection,
      ...values,
    };

    const updatedCollectionList = [...collectionList];
    updatedCollectionList[colIndex] = updatedCurrentCollection;

    await updateDoc(userDocRef, {
      collectionList: updatedCollectionList,
    });

    if (currentVisibility === "public" && values.visibility === "private") {
      const publicDocRef = doc(db, "publicCollections", colId);
      await deleteDoc(publicDocRef);
    } else if (values.visibility === "public") {
      const publicDocRef = doc(db, "publicCollections", colId);
      await setDoc(publicDocRef, {
        ...updatedCurrentCollection,
      });
    }

    return { userId, colId, values };
  } catch (err) {
    console.error("Service | koleksiyon güncellenirken hata:", err);
    throw err;
  }
};

export const getPublicCollections = async () => {
  try {
    const publicColRef = collection(db, "publicCollections");
    const querySnapshot = await getDocs(publicColRef);

    const collections = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return collections;
  } catch (error) {
    throw new Error(
      "Public koleksiyonlar alınırken bir hata oluştu: " + error.message
    );
  }
};

export const addCardToCollection = async (userId, colId, newCardData) => {
  if (!userId) throw new Error("Kullanıcı ID'si boş olamaz.");
  if (!colId) throw new Error("Koleksiyon ID'si boş olamaz.");

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Kullanıcı belgesi bulunamadı.");
    }

    const userData = userDocSnap.data();
    const userCollections = userData.collectionList || [];

    const collectionIndex = userCollections.findIndex(
      (col) => col.id === colId
    );
    if (collectionIndex === -1) {
      throw new Error("Koleksiyon bulunamadı.");
    }

    const newCard = {
      id: uuidv4(),
      front: newCardData.front,
      back: newCardData.back,
      difficulty: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      studyedAt: null,
      stats: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
        successRate: 0,
      },
      isArchived: false,
    };

    const updatedCollections = [...userCollections];

    const currentCollection = updatedCollections[collectionIndex];
    const existingCards = Array.isArray(currentCollection.cards)
      ? currentCollection.cards
      : [];

    updatedCollections[collectionIndex] = {
      ...currentCollection,
      cards: [...existingCards, newCard],
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(userDocRef, {
      collectionList: updatedCollections,
    });

    if (currentCollection.visibility === "public") {
      const publicDocRef = doc(db, "publicCollections", colId);
      const publicDocSnap = await getDoc(publicDocRef);

      if (publicDocSnap.exists()) {
        const publicData = publicDocSnap.data();
        const publicColCards = Array.isArray(publicData.cards)
          ? publicData.cards
          : [];

        await updateDoc(publicDocRef, {
          cards: [...publicColCards, newCard],
          updatedAt: new Date().toISOString(),
        });
      }
    }

    return { colId, card: newCard };
  } catch (err) {
    console.error("Service | Kart ekleme hatası:", err);
    throw err;
  }
};

export const deleteCardFromCollection = async (userId, colId, cardId) => {
  if (!userId) throw new Error("Kullanıcı ID'si boş olamaz.");
  if (!colId) throw new Error("Koleksiyon ID'si boş olamaz.");
  if (!cardId) throw new Error("Kart ID'si boş olamaz.");

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Service | Kullanıcı belgesi bulunamadı.");
    }

    const userData = userDocSnap.data();
    const userCollections = userData.collectionList || [];

    const colIndex = userCollections.findIndex((col) => col.id === colId);
    if (colIndex === -1) {
      throw new Error("Service | Koleksiyon bulunamadı.");
    }

    const updatedCollections = [...userCollections];
    const currentCollection = updatedCollections[colIndex];

    const updatedCards = (currentCollection.cards || []).filter(
      (card) => card.id !== cardId
    );

    updatedCollections[colIndex] = {
      ...currentCollection,
      cards: updatedCards,
    };

    updateDoc(userDocRef, {
      collectionList: updatedCollections,
    });

    if (currentCollection.visibility === "public") {
      const publicDocRef = doc(db, "publicCollections", colId);
      const publicDocSnap = await getDoc(publicDocRef);
      if (publicDocSnap.exists()) {
        const publicColData = publicDocSnap.data();
        const updatedPublicColCards = (
          Array.isArray(publicColData.cards) ? publicColData.cards : []
        ).filter((card) => card.id !== cardId);

        await updateDoc(publicDocRef, {
          cards: updatedPublicColCards,
        });
      }
    }

    return { colId, cardId };
  } catch (err) {
    console.error("Service | Kart silinirken hata oluştu:", err);
    throw err;
  }
};

export const updateCardInCollection = async (userId, colId, cardId, values) => {
  if (!userId) throw new Error("Kullanıcı ID'si boş olamaz.");
  if (!colId) throw new Error("Koleksiyon ID'si boş olamaz.");
  if (!cardId) throw new Error("Kart ID'si boş olamaz.");

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Service | Kullanıcı belgesi bulunamadı.");
    }

    const userData = userDocSnap.data();
    const userCollections = userData.collectionList || [];

    const colIndex = userCollections.findIndex((col) => col.id === colId);
    if (colIndex === -1) {
      throw new Error("Service | Koleksiyon bulunamadı.");
    }

    const updatedCollections = [...userCollections];
    const currentCollection = updatedCollections[colIndex];

    const updatedCards = (currentCollection.cards || []).map((card) =>
      card.id === cardId ? { ...card, ...values } : card
    );

    updatedCollections[colIndex] = {
      ...currentCollection,
      cards: updatedCards,
    };

    await updateDoc(userDocRef, {
      collectionList: updatedCollections,
    });

    if (currentCollection.visibility === "public") {
      const publicDocRef = doc(db, "publicCollections", colId);
      const publicDocSnap = await getDoc(publicDocRef);

      if (publicDocSnap.exists()) {
        const publicColData = publicDocSnap.data();
        const updatedPublicCards = (
          Array.isArray(publicColData.cards) ? publicColData.cards : []
        ).map((card) => (card.id === cardId ? { ...card, ...values } : card));

        await updateDoc(publicDocRef, {
          cards: updatedPublicCards,
        });
      }
    }

    return {
      colId,
      cardId,
      updatedCard: values,
      visibility: currentCollection.visibility,
    };
  } catch (err) {
    console.error("Service | Kart güncellenirken hata oluştu:", err);
    throw err;
  }
};

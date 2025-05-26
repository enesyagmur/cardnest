import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
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

    const updatedCurrentCollection = {
      ...currentCollection,
      ...values,
    };

    const updatedCollectionList = [...collectionList];
    updatedCollectionList[colIndex] = updatedCurrentCollection;

    await updateDoc(userDocRef, {
      collectionList: updatedCollectionList,
    });

    return { userId, colId, values };
  } catch (err) {
    console.error("Service | koleksiyon güncellenirken hata:", err);
    throw err;
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
    };

    await updateDoc(userDocRef, {
      collectionList: updatedCollections,
    });

    return { colId, card: newCard };
  } catch (err) {
    console.error("Karta ekleme hatası:", err);
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

    return { colId, cardId };
  } catch (err) {
    console.error("Service | Kart silinirken hata oluştu:", err);
    throw err;
  }
};

export const updateCardInCollection = async (userId, colId, cardId, values) => {
  if (!userId || !colId || !cardId) {
    throw new Error("Kullanıcı ID, Koleksiyon ID ve Kart ID gerekli.");
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Service | Kullanıcı belgesi bulunamadı.");
    }

    const userData = userDocSnap.data();
    const userCollectionList = userData.collectionList || [];

    const colIndex = userCollectionList.findIndex((col) => col.id === colId);
    if (colIndex === -1) {
      throw new Error("Service | Koleksiyon bulunamadı.");
    }

    const currentCollection = userCollectionList[colIndex];

    const cardIndex = currentCollection.cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) {
      throw new Error("Service | Kart bulunamadı.");
    }

    const currentCard = currentCollection.cards[cardIndex];

    const updatedTime = new Date().toISOString();

    const updatedCard = {
      ...currentCard,
      ...values,
      updatedAt: updatedTime,
    };

    const updatedCollections = [...userCollectionList];
    updatedCollections[colIndex].cards[cardIndex] = updatedCard;
    await updateDoc(userDocRef, {
      collectionList: updatedCollections,
    });
    return { colId, cardId, updatedTime, values };
  } catch (err) {
    console.error("Service | Kart güncellenirken hata:", err);
    throw err;
  }
};

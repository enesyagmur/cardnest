import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const registerUser = async (userName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("FirebaseAuthService | Kullanıcı oluşturuldu");

    //profil güncelleme
    await updateProfile(user, { displayName: userName });
    console.log("FirebaseAuthService | Kullanıcı ismi güncellendi");

    //kullanıcıyı firestore a kayıt etme
    await setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      createdAt: new Date.toISOString(),
    });
    console.log("FirebaseAuthService | Kullanıcı firestore a eklendi");
    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Kullanıcı kayıt yada Firestore hatası: ",
      err.code,
      err.message
    );
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Giriş başarısız: ",
      err.message,
      err.code
    );
    throw err;
  }
};

export const provider = new GoogleAuthProvider();

export const signWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    console.log("FirebaseAuthService | Google ile giriş başarılı");
    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Google ile giriş başarısız:",
      err.message,
      err.code
    );
    throw err;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("FirebaseAuthService | Çıkış başarılı");
  } catch (err) {
    console.error(
      "FirebaseAuthService | Çıkış işlemi başarısız: ",
      err.message,
      err.code
    );
    throw err;
  }
};

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const updateProfilePhotoService = async (photo) => {
  try {
    if (!photo) {
      throw new Error("SERVICE | Resim güncellenirken sorun: resim eksik");
    }

    if (!auth.currentUser) {
      throw new Error(
        "SERVICE | Resim güncellenirken sorun: Kullanıcı Bulunamadı"
      );
    }

    const photoRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
    await uploadBytes(photoRef, photo);

    const photoURL = await getDownloadURL(photoRef);

    await updateProfile(auth.currentUser, { photoURL });
  } catch (err) {
    throw new Error(`SERVICE | Resim güncellenirken sorun: ${err}`);
  }
};

export const updateNameService = async (name) => {
  try {
    if (!name) {
      throw new Error("SERVICE | İsim güncellenirken sorun: name eksik");
    }

    if (!auth.currentUser) {
      throw new Error(
        "SERVICE | isim güncellenirken sorun: Kullanıcı Bulunamadı"
      );
    }

    await updateProfile(auth.currentUser, { displayName: name });
  } catch (err) {
    throw new Error(`SERVICE | isim güncellenirken sorun: ${err}`);
  }
};

export const updateEmailService = async (email) => {
  try {
    if (!email) {
      throw new Error("SERVICE | email güncellenirken sorun: email eksik");
    }

    if (!auth.currentUser) {
      throw new Error(
        "SERVICE | email güncellenirken sorun: Kullanıcı Bulunamadı"
      );
    }

    await updateEmail(auth.currentUser, email);
  } catch (err) {
    throw new Error(`SERVICE | email güncellenirken sorun: ${err}`);
  }
};

export const updatePasswordService = async (currentPassword, newPassword) => {
  try {
    if (!auth.currentUser) {
      throw new Error(
        "SERVICE | Şifre güncelleme işleminde sorun : Kullanıcı oturumu bulunamadı"
      );
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);

    await updatePassword(auth.currentUser, newPassword);
  } catch (err) {
    throw new Error(`SERVICE | Şifre güncellenirken sorun: ${err}`);
  }
};
